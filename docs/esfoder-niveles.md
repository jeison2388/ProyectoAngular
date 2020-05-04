### MÉTODOS GET PARA CATÁLOGOS EN NIVELES SUS DETALLES

### GET /esfoder/obtenerSubProgramas

Esta solicitud consulta el catalogo de sub_programas [activos?] que deben mostrarse en la vista de niveles.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
      "id": 1,
      "sub_programa": "futbol"
    } ...
]
```

Si no se encuentran resultados devolver.

```Javascript
[]
```

### GET /esfoder/obtenerCategoriasNivel

Esta solicitud consulta el catalogo de categorías [activos?] que deben mostrarse en la vista de niveles.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "categoria": "2010"
    } ...
]
```

Si no se encuentran resultados devolver.

```Javascript
[]
```

### GET /esfoder/obtenerNivel/:idNivel

Esta solicitud consulta los dartos iniciales de una nivel para su ediciòn
El sistema debe responder con un objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "codigo": "00nvlnatacion",
    "descripcion": "nivel 1 niños  6-12 años",
    "id_programa": 1,
    "id_categoria": 1,
    "servicio": {
        "id_servicio": 1,
        "codigo": "CC-5247",
        "servicio": "MENSULAIDAD NIVEL I NATACION"
        "tipo_servicio": "Mensualidad",
        "servicio_programa": "DEPORTES"
      }
    }
]
```

Si no se encuentran resultados devolver.

```Javascript
[]

### Catalogos grupos

### GET /esfoder/obtenerInstructores

Esta solicitud consulta el catalogo de instructores [activos?] que deben mostrarse en la vista de niveles grupos.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "instructor": "Eduar Velasquez"
    } ...
]
```

Si no se encuentran resultados devolver.

```Javascript
[]
```

#################################### MÉTODOS GET PARA LA CONSULTA DE VALORES EN NIVELES Y SUS DETALLES ########################################

### GET /esfoder/buscarGruposPorNivel/:idNivel

Esta solicitud busca los grupos por el Nivel asociado, contenido:
El sistema debe responder con un array de objetos JSON de la siguiente manera

````Javascript
[
  {
    "idGrupo": "1",
    "nivel": "1",
    "codigo": "ESF-001",
    "descripcion": "grupo del nivel 1 natacion",
    "edadDesde": "15",
    "edadhasta": "30",
    "id_instructor": 1,
    "minimoPacientes": "10",
    "numeroUsos": "10",
    "cantidadCupos": "25",
    "id_escenario": 1,
    "des_escenario": "Carril 1",
    "des_escenario_principal": "Piscina climatizada",
    "des_infraestructura": "Unidad eportiva la villa",
    "unidad": "Unidad 1",
    "clase_grupo": {
        "id_clase_grupo": 1,
        "fecha_clase": "14/01/2020",
        "hora_inicio": "06:00",
        "hora_fin": "08:00"
      },
      {
        "id_clase_grupo": 2,
        "fecha_clase": "14/01/2020",
        "hora_inicio": "13:00",
        "hora_fin": "15:00"
      }...
  }...
]
```
Si no se encuentran resultados devolver.
```Javascript
[]
```

### GET /esfoder/buscarPlanClase/:idClaseGrupo
Esta solicitud busca los planes clase, array de objetos JSON, que se relacionan a cada clase de un grupo, contenido:

````Javascript
[
  {
    "id": 1,
    "id_clase_grupo": 2,
    "objetivo 1": "Objetivo número 1"
  }...
]
```
Si no se encuentran resultados devolver.
```Javascript
[]
```

#### --

#### Método POST para ESFODER Nivel

### POST /esfoder/guardarEditarNivel

Esta solicitud envía los datos para la edición y/o actualización de un Nivel,
es importante indicar que para la actualización, se enviarán NULL (vacio)
los atributos [ id ] para las tablas:
[nivel, grupo, clase_grupo, plan_clase, grupo_escenario_sec],
de acuerdo a su dependencia una de otra, se deberá asignar el ID que se vaya registrando.

````Javascript
[
    {
        "id": 111,
        "codigo": "001",
        "descripcion": "futbol",
        "id_sub_programa": 1,
        "id_servicio": 1,
        "id_categoria": 1,
        "id_usuario": 1,
        "grupos": [
            {
                "id": 222,
                "id_nivel": 111,
                "id_escenario": 1,
                "id_escenario_secundario": 1,
                "id_instructor": 1,
                "id_usuario": 1,
                "codigo": "ESF-001",
                "descripcion": "grupo del nivel 1 natacion",
                "fechaInicio": "01/01/2020",
                "fechaFin": "15/03/2020",
                "edadDesde": 12,
                "edadhasta": 23,
                "minimoPacientes": 12,
                "numeroUsos": 12,
                "cantidadCupos": 25,
                "formaAplicar": true,
                "clases_grupo": [
                    {
                        "id": 333,
                        "id_grupo": 222,
                        "fecha": "15/03/2020",
                        "horaInicio": "8:00",
                        "horaFinal": "10:00",
                        "id_usuario": 1,
                        "planes_clase": [
                            {
                                "id": 1,
                                "id_clase_grupo": 333,
                                "objetivo": "obj 1",
                                "id_usuario": 1
                            },
                            {
                                "id": 2,
                                "id_clase_grupo": 333,
                                "objetivo": "obj 1",
                                "id_usuario": 1
                            }...
                        ]
                    },
                    {
                        "id": 2,
                        "id_grupo": 222,
                        "fecha": "16/03/2020",
                        "horaInicio": "8:00",
                        "horaFinal": "10:00",
                        "id_usuario": 1,
                        "planes_clase": [
                            {}
                        ]
                    }
                ],
                "grupo_escenario_sec": [
                    {
                        "id": 777,
                        "id_grupo": 222,
                        "id_escenario_secundario": 998
                    },
                    {
                        "id": 778,
                        "id_grupo": 222,
                        "id_escenario_secundario": 999
                    }...
                ]
            },
            {
                "id": 444,
                "id_nivel": 111,
                "id_escenario": 1,
                "id_escenario_secundario": 1,
                "id_instructor": 1,
                "id_usuario": 1,
                "codigo": "ESF-001",
                "descripcion": "grupo del nivel 1 natacion",
                "fechaInicio": "01/01/2020",
                "fechaFin": "15/03/2020",
                "edadDesde": 12,
                "edadhasta": 23,
                "minimoPacientes": 12,
                "numeroUsos": 12,
                "cantidadCupos": 25,
                "formaAplicar": true,
                "clases_grupo": [
                    {
                        "id": 55,
                        "id_grupo": 444,
                        "fecha": "15/03/2020",
                        "horaInicio": "8:00",
                        "horaFinal": "10:00",
                        "id_usuario": 1,
                        "planes_clase": [
                            {
                                "id": 1,
                                "id_clase_grupo": 55,
                                "objetivo": "obj 1",
                                "id_usuario": 1
                            }...
                        ]
                    },
                    {
                        "id": 56,
                        "id_grupo": 444,
                        "fecha": "16/03/2020",
                        "horaInicio": "8:00",
                        "horaFinal": "10:00",
                        "id_usuario": 1,
                        "planes_clase": [
                            {}
                        ]
                    }...
                ],
                "grupo_escenario_sec": [
                    {}
                ]
            }
        ]
    }
]
```
