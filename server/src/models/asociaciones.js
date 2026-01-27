const Profesor = require('./Profesor');
const TecnicoDocente = require('./TecnicoDocente');
const ResponsableLab = require('./ResponsableLab');
const Alumno = require('./Alumno');
const Laboratorio = require('./Laboratorio');
const Materia = require('./Materia');
const Grupo = require('./Grupo');
const HorarioClase = require('./HorarioClase');
const Material = require('./Material');
const Solicitud = require('./Solicitud');

// --- RELACIONES ---

// Laboratorio y Responsable
Laboratorio.belongsTo(ResponsableLab, { foreignKey: 'id_responsable' });
ResponsableLab.hasMany(Laboratorio, { foreignKey: 'id_responsable' });

// Materia y Laboratorio
Materia.belongsTo(Laboratorio, { foreignKey: 'id_laboratorio' });
Laboratorio.hasMany(Materia, { foreignKey: 'id_laboratorio' });

// Grupo depende de Materia y Profesor
Grupo.belongsTo(Materia, { foreignKey: 'id_materia' });
Materia.hasMany(Grupo, { foreignKey: 'id_materia' });

Grupo.belongsTo(Profesor, { foreignKey: 'id_profesor' });
Profesor.hasMany(Grupo, { foreignKey: 'id_profesor' });

// Horario pertenece a Grupo
HorarioClase.belongsTo(Grupo, { foreignKey: 'id_grupo' });
Grupo.hasMany(HorarioClase, { foreignKey: 'id_grupo' });

// Alumnos e Inscripción (Relación Muchos a Muchos)
Grupo.belongsToMany(Alumno, { through: 'Inscripcion_a_Grupo', foreignKey: 'id_grupo', otherKey: 'id_alumno', timestamps: false });
Alumno.belongsToMany(Grupo, { through: 'Inscripcion_a_Grupo', foreignKey: 'id_alumno', otherKey: 'id_grupo', timestamps: false });

// Material y Laboratorio
Material.belongsTo(Laboratorio, { foreignKey: 'id_laboratorio' });
Laboratorio.hasMany(Material, { foreignKey: 'id_laboratorio' });

// Solicitudes
Solicitud.belongsTo(Profesor, { foreignKey: 'id_profesor' });
Solicitud.belongsTo(Grupo, { foreignKey: 'id_grupo' });
Solicitud.belongsTo(TecnicoDocente, { foreignKey: 'id_tecnico_docente' });

// Relación Solicitud -> Material (Muchos a Muchos a través de Detalle)
// Nota: Definimos Detalle_Solicitud implícitamente aquí o puedes crear su modelo aparte si necesitas campos extra
Solicitud.belongsToMany(Material, { through: 'Detalle_Solicitud', foreignKey: 'id_solicitud', otherKey: 'id_material', timestamps: false });
Material.belongsToMany(Solicitud, { through: 'Detalle_Solicitud', foreignKey: 'id_material', otherKey: 'id_solicitud', timestamps: false });

module.exports = {
    Profesor, TecnicoDocente, ResponsableLab, Alumno,
    Laboratorio, Materia, Grupo, HorarioClase,
    Material, Solicitud
};