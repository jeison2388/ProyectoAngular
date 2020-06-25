### POST /competicion/agregarCompeticion
Esta solicitud registra una competicions , usted debe enviar estos datos sin el encabezado "Content Type" y en formato "FormData" los datos que usted debe proveer son los siguientes:  
Nombre de la variable: **datos**, contenido:
```Javascript
{
    "nombreCompetencia": "Campeonado villa olimpica",
    "deporte": "futbol",
    "categoria": "juvenil",
    "modalidad": "futbol 11",
    "tipoCompeticion": "copa",
    "numeroEliminatorias": "octavos",
    "fechaInicio": "20/02/2020",
    "fechaFin": "23/02/2020",
    "duracionPartido": "15min",
    "genero": "masculino",
    "numeroEquipos": "8",
    "numeroMinimoInscritos": "10"
    "itemsDesempate : [diferenciaGol, equipoMejorFairPlay]"
    "tercerYCuarto : true"
}
```
Nombre de la variable: **indice [ i ]** , por ejemplo **indice1, indice2 ...**, contenido: archivo del indice del libro en formato PDF.  

En caso de error, el servicio devolverá una respuesta como sigue.
```Javascript
{
    "campo": "código del campo",
    "error": "código del error"
}

```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|


### GET /competicion/obtenerDeportes
Esta solicitud consulta el catalogo de deportes que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "deporte": "futbol"
    } ...
]
```
Si no se encuentran deportes devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerCategorias
Esta solicitud consulta el catalogo de categorias que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "categoria": "infantil"
    } ...
]
```
Si no se encuentran categorias devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerModalidades
Esta solicitud consulta el catalogo de modalidades que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "modalidad": "futbol 11"
    } ...
]
```
Si no se encuentran modalidades devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerTiposCompeticion
Esta solicitud consulta el catalogo de tipos de Competicion que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "tipoCompeticion": "futbol 11"
    } ...
]
```
Si no se encuentran  tipos de Competicion devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerNumeroEliminatorias
Esta solicitud consulta el catalogo de numero de Eliminatorias que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "numeroEliminatorias": "octavos"
    } ...
]
```
Si no se encuentran  numero de Eliminatorias que devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerDuracionesPartidos
Esta solicitud consulta el catalogo de duraciones partidos que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "duracionPartido": "40 minutos"
    } ...
]
```
Si no se encuentran duraciones partidos que devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerGeneros
Esta solicitud consulta el catalogo de generos que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "genero": "masculino"
    } ...
]
```
Si no se encuentran duraciones partidos que devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerNumeroMinimoEquiposTorneo
Esta solicitud consulta el catalogo de numero minimo inscritos por torneo que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "numero": "8"
    } ...
]
```
Si no se encuentran numero minimo inscritos por torneo que devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/obtenerItemsDesempate
Esta solicitud consulta el catalogo de items Desempate que deben mostrarse en la vista de competiciones.  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "descripcion": "Diferencia de goles Total"
    } ...
]
```
Si no se encuentran items Desempate que devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|


### GET /competicion/obtenerEquipos/{idCompeticion}
Esta solicitud consulta los equipos asociados a una competicion.Se debe pasar el id de la competicion como parametro url  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "nombre_equipo": "Bayer",
    "Delegado": "juanito",
    "identificaion_delegago": 1061737494,
    "tel_delegado": 3153245789,
    "estado_equipo": "pendiente de pago"
    "id_estado_equipo" : 3

    } ...
]
```
Si no se encuentran equipos devolver.
```Javascript
[]
```

#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/equipos/obtenerJugadores/{idEquipo}
Esta solicitud consulta los jugadores asociados a una equipo.Se debe pasar el id del equipo como parametro url  
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
   {
    "id": 1,
    "cedula": 10614574,
    "nombres": "juanito",
    "apellidos": "vianqui",
    "celular": 3153245789,
    "categoria": "A"
    "valor" : 6500

    } ...
]
```
Si no se encuentran jugadores devolver.
```Javascript
[]
```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/jugador/obtenerJugadore/{idJugador}
Esta solicitud consulta la informacion de un jugador.Se debe pasar el id del equipo como parametro url 
Tener en cuenta que se debe consultar al servicio de comfacauca para devolvernos la informacion, 
El sistema debe responder con un objeto JSON de la siguiente manera
```Javascript
   {
    "particular": false
    "id": 1,
    "cedula": 10614574,
    "nombres": "juanito",
    "apellidos": "vianqui",
    "celular": 3153245789,
    "categoria": "A"
    "valor" : 6500
    }
```
Si no se encuentran informacion del jugador en comfacuaca devolver.
```Javascript
   {
    "particular": true
    "categoria": "Particular"
    "valor" : 6500
    }
```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|


### POST /competicion/agregarJugador
Esta solicitud registra un jugador en un equipo , usted debe enviar estos datos en el body de la peticion:  

```Javascript
{
    "idCompetencia": 55678,
    "cedula": 123456789,
    "nombres": "juanito",
    "apellido": "nuñz",
    "telefono": 3152654789,   
}
```

En caso de error, el servicio devolverá una respuesta como sigue.
```Javascript
{
    "campo": "código del campo",
    "error": "código del error"
}
```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|


### POST /competicion/agregarEquipo
Esta solicitud registra un equipo en una competencia, usted debe enviar estos datos en el body de la peticion:  

```Javascript
{
    "idCompetencia": 25487,
    "nombreEquipo": "BAYER",
    "Nombre delegado": "brayan",
    "identificacionDelegado": 1065477894,
    "telefono": 3152654789,   
}
```

En caso de error, el servicio devolverá una respuesta como sigue.
```Javascript
{
    "campo": "código del campo",
    "error": "código del error"
}
```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /competicion/escenarios/{idCompeticion}
Esta solicitud devuelve un listado de escenarios disponibles para una competicion especifica, usted debe enviar en la url el id de la competicion
para que el back devuelva solo los escenarios disponibles para ese tipo de competicion con sus respectivos datso como se muestra a continuacion:  
Tener en cuenta que los horarios disponibles es un array que contiene todos los dias de la semana con sus respectivos horarios disponibles en el momento de la peticion
```Javascript
{
    "idEscenario" : 1234
    "nombre": "Cancha futbol",
    "horarios disponibles": [
        lunes : [
            { 
                horaInicio : "8:00"
                franjaHorariaInicio : "AM"
                horaFIn    : "9:00"
                franjaHorariaFin : "AM"
            },
             { 
                horaInicio :"11:30"
                franjaHorariaInicio : "AM"
                horaFIn    : "12:30"
                franjaHorariaFin : "AM"
            },

        ],
        martes : [
            { 
                horaInicio : "8:00"
                franjaHorariaInicio : "AM"
                horaFIn    : "9:00"
                franjaHorariaFin : "AM"
            },
             { 
                horaInicio :"11:30"
                franjaHorariaInicio : "AM"
                horaFIn    : "12:30"
                franjaHorariaFin : "AM"
            },
        ]
    ],
    "Nombre delegado": "brayan",
    "identificacionDelegado": 1065477894,
    "telefono": 3152654789,   
}
```

Si no se encuentran escenarios devolver.
```Javascript
[]
```

En caso de error, el servicio devolverá una respuesta como sigue.
```Javascript
{
    "campo": "código del campo",
    "error": "código del error"
}
```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|


