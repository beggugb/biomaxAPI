import KeyToken from './keyToken'
import usuarioRoutes from './UsuarioRoutes'
/*import tareaRoutes from './TareasRoutes'*/
import cutterRoutes from './CutterRoutes'
import deweyRoutes from './DeweyRoutes'
import editorialRoutes from './EditorialRoutes'
import carreraRoutes from './CarreraRoutes'
import facultadRoutes from './FacultadRoutes'
import libroRoutes from './LibroRoutes'
import fileRoutes from './FilesRoutes'
import bibliotecaRoutes from './BibliotecaRoutes'
import consultasRoutes from './ConsultasRoutes'
import datasRoutes from './DatasRoutes'
import informesRoutes from './InformesRoutes'
import estudiantesRoutes from './EstudiantesRoutes'
import movimientosRoutes from './MovimientosRoutes'
import devolucionesRoutes from './DevolucionesRoutes'
export default (app) => {
        app.use('/api/usuarios',usuarioRoutes);                
/*        app.use('/api/tareas', KeyToken,tareaRoutes);                */
	app.use('/api/facultades',facultadRoutes);
	app.use('/api/carreras', carreraRoutes);
	app.use('/api/editoriales', editorialRoutes);
	app.use('/api/deweys', deweyRoutes);
	app.use('/api/cutters', cutterRoutes);
/*	app.use('/api/tareas',KeyToken, tareaRoutes);*/
	app.use('/api/libros', libroRoutes);
	app.use('/api/files',fileRoutes);
	app.use('/api/bibliotecas',bibliotecaRoutes);
        app.use('/api/alumnos',estudiantesRoutes);
	app.use('/api/consultas', consultasRoutes);
	app.use('/api/datas', datasRoutes);
	app.use('/api/informes', informesRoutes);
	app.use('/api/movimientos', movimientosRoutes);
	app.use('/api/devoluciones', devolucionesRoutes);
}
