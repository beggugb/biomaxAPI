import LibroService from "../services/LibroService";
import MovimientosService from "../services/MovimientosService";

class InformesController {
 
static libros(req, res) {    
    const { carreraId, editorialId, tipo } = req.body;       
    Promise.all([LibroService.reporte(carreraId, editorialId, tipo)])
      .then(([data]) => {
        res.status(200).send({ result: {detalle: data.total, data: data } });
      })
      .catch((reason) => {
	      console.log(reason)
        res.status(400).send({ message: reason });
      });    
  }
 
    static consolidado(req, res) {         
    Promise.all([LibroService.total(),LibroService.totals()])
      .then(([dat,datas]) => {        
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {

        res.status(400).send({ message: reason });
      });    
  }

  static movimientos(req, res) {   
    const { desde, hasta, tipo } = req.body;          

    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)


    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    Promise.all([MovimientosService.total(fdesde,fhasta,tipo),
	    	 MovimientosService.totalDetalle(fdesde,fhasta,tipo)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {
         console.log(reason)
        res.status(400).send({ message: reason });
      });    
  }	

}

export default InformesController;
