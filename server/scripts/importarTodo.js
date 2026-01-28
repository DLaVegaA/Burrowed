const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx'); 
const sequelize = require('../src/config/db');
const Material = require('../src/models/Material');

const ID_LABORATORIO = 1; 

const limpiar = (texto) => {
  if (texto === undefined || texto === null) return null;
  const limpio = String(texto).trim().replace(/\s+/g, ' '); 
  return (limpio === '' || limpio === '0' || limpio === 'undefined') ? null : limpio;
};

async function importar() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a BD exitosa (Modo: Solo Insertar).');

    const carpetaRaiz = path.join(__dirname, '../../');
    const archivoExcel = fs.readdirSync(carpetaRaiz).find(f => f.endsWith('.xlsx') && !f.startsWith('~$'));

    if (!archivoExcel) {
      console.error('❌ ERROR: No encontré el archivo .xlsx');
      process.exit(1);
    }

    console.log(`\n📗 Leyendo archivo: ${archivoExcel}...`);
    const workbook = xlsx.readFile(path.join(carpetaRaiz, archivoExcel));

    for (const nombreHoja of workbook.SheetNames) {
      console.log(`\n⬇️  Procesando Pestaña: ${nombreHoja}...`);
      
      let ubicacion = nombreHoja; 
      if (nombreHoja.toLowerCase().includes('cables')) ubicacion = 'Gabinete de Cables';

      const worksheet = workbook.Sheets[nombreHoja];
      const datosCrudos = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      
      let filaEncabezado = -1;
      for(let i = 0; i < Math.min(datosCrudos.length, 15); i++) {
        const filaStr = JSON.stringify(datosCrudos[i] || []).toLowerCase();
        if(filaStr.includes('nombre') || (filaStr.includes('descripc') && filaStr.includes('cantidad'))) {
          filaEncabezado = i;
          break;
        }
      }

      if (filaEncabezado === -1) {
        console.log(`   ⚠️  No encontré encabezados en "${nombreHoja}".`);
        continue;
      }

      // Leemos los datos (defval: '' asegura que no vengan undefined)
      const datos = xlsx.utils.sheet_to_json(worksheet, { range: filaEncabezado, defval: '' });
      
      // --- 🔍 DIAGNÓSTICO DE DATOS ---
      if (datos.length > 0) {
        console.log('   🔎 ASÍ SE VE LA PRIMERA FILA DE DATOS (RAW):');
        console.log(JSON.stringify(datos[0], null, 2)); // Imprime bonito el objeto
      } else {
        console.log('   ⚠️  La hoja parece no tener datos debajo de los encabezados.');
        continue;
      }
      // --------------------------------

      let guardados = 0;

      for (let row of datos) {
        const keys = Object.keys(row);
        
        // Buscamos columnas clave
        const kNombre = keys.find(k => k.toLowerCase().includes('nombre') || k.toLowerCase().includes('equipo'));
        const kDesc = keys.find(k => k.toLowerCase().includes('descripci'));
        const kCantidad = keys.find(k => k.toLowerCase().includes('cantidad'));
        
        // Recuperamos valores
        let nombreRaw = kNombre ? row[kNombre] : null;
        // Si no hay nombre, intentamos usar la descripción
        if (!nombreRaw && kDesc) nombreRaw = row[kDesc];

        const nombreMaterial = limpiar(nombreRaw);

        // Si después de limpiar no hay nombre, avisamos POR QUÉ saltamos la primera fila (solo 1 vez)
        if (!nombreMaterial) {
           if (guardados === 0 && datos.indexOf(row) === 0) {
             console.log(`   ⚠️  Saltando fila 1 porque el Nombre es inválido: "${nombreRaw}"`);
           }
           continue; 
        }

        const cantidad = (kCantidad && parseInt(row[kCantidad])) ? parseInt(row[kCantidad]) : 1; 
        
        // Otros campos
        const kSicpat = keys.find(k => k.toLowerCase().includes('sicpat'));
        const kBarras = keys.find(k => k.toLowerCase().includes('barra'));
        const kSerie = keys.find(k => k.toLowerCase().includes('serie') || k.toLowerCase().includes('orden'));
        const kIdInv = keys.find(k => k.toLowerCase().includes('inventario') && k.toLowerCase().includes('id'));
        
        const sicpat = kSicpat ? limpiar(row[kSicpat]) : null;
        const codBarras = kBarras ? limpiar(row[kBarras]) : null;
        const serieFabricante = kSerie ? limpiar(row[kSerie]) : null; 
        const idInterno = kIdInv ? limpiar(row[kIdInv]) : null;
        const descripcionExcel = kDesc ? limpiar(row[kDesc]) : nombreMaterial; 

        for (let i = 0; i < cantidad; i++) {
          const esElOriginal = (i === 0);
          const nuevoMaterial = {
            id_laboratorio: ID_LABORATORIO,
            nombre_material: nombreMaterial,
            sicpat: esElOriginal ? sicpat : null,
            no_serie: esElOriginal ? serieFabricante : null,
            codigo_barras: esElOriginal ? codBarras : null,
            id_inventario_interno: esElOriginal ? idInterno : null,
            descripcion_tecnica: descripcionExcel,
            observaciones: null,
            estado_fisico: 'Bueno',
            estado_disponibilidad: 'Disponible',
            ubicacion_estante: ubicacion 
          };

          try {
            await Material.create(nuevoMaterial);
            guardados++;
            process.stdout.write('.');
          } catch (err) {
             if (err.name === 'SequelizeUniqueConstraintError') {
                 nuevoMaterial.sicpat = null;
                 nuevoMaterial.no_serie = null;
                 try { await Material.create(nuevoMaterial); process.stdout.write('R'); } catch (e) {}
             }
          }
        }
      }
      console.log(`\n   ✅ ${guardados} items guardados.`);
    }
    console.log('\n🏁 ¡Importación COMPLETA!');
    process.exit();
  } catch (error) {
    console.error('Error Fatal:', error);
    process.exit(1);
  }
}

importar();