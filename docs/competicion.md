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

