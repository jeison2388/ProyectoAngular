### MÉTODOS GET PARA ESFODER EVALUACIÓN DE RENDIMIENTO

### GET /esfoder/obtenerProgramas

Esta solicitud consulta el catalogo de programas [activos?] que
deben mostrarse en la vista de evaluacion.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "programa": "futbol"
    } ...
]
```

Si no se encuentran programas devolver.

```Javascript
[]
```

### GET /esfoder/obtenerNiveles

Esta solicitud consulta el catalogo de Niveles [activos?] que
deben mostrarse en la vista de evaluaciones.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "nivel": "Nivel I"
    } ...
]
```

Si no se encuentran niveles devolver.

```Javascript[]

```

### GET /esfoder/obtenerNivelesEvaluacion

Esta solicitud consulta el catalogo de Niveles Evaluación [activos?] que
deben mostrarse en la vista de evaluaciones.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "codigo": "M",
    "descripcion": "Malo",
    "activo": 1,
    "orden": 1
    } ...
]
```

Si no se encuentran categoría nivelEvaluación devolver.

```Javascript
[]
```

### GET /esfoder/obtenerComponentes

Esta solicitud consulta el catálogo de Componentes [activos?] que
deben mostrarse en la vista de evaluaciones.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "codigo": "M",
    "descripcion": "Malo",
    "activo": 1
    } ...
]
```

Si no se encuentran componentes devolver.

```Javascript

[]
```

### GET /esfoder/obtenerSubComponentes

Esta solicitud consulta el catálogo de SUB Componentes [activos?] que
deben mostrarse en la vista de evaluaciones.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "codigo": "M",
    "descripcion": "Malo",
    "activo": 1
    "id_componente": 1
    } ...
]
```

Si no se encuentran subComponentes devolver.

```Javascript
[]
```

### GET /esfoder/obtenerEvaluacion/:idEvaluacion

Esta solicitud consulta una evaluación que
deben mostrarse en la vista de evaluaciones, cuando se va a editar
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "codigo": "ECI-001",
    "descripcion": "Evaluación I Nivel ESFODER Natación 4-5 años",
    "id_nivel": 1
    "porcentaje_aprobacion": 60.0
    }
]
```

Si no se encuentran resultados devolver.

```Javascript

[]
```

### GET /esfoder/obtenerComponentesEvaluacion/:idEvaluacion

Esta solicitud consulta los componentes asociados a una evaluación que
deben mostrarse en la vista de evaluaciones, cuando se va a editar
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "id_componente": 1,
    "id_evaluacion": 1,
    "valor_componente": "50"
    } ...
]
```

Si no se encuentran resultados devolver.

```Javascript

[]
```

### GET /esfoder/obtenerSubComponentesEvaluacion/:idComponenteEvaluacion

Esta solicitud consulta los componentes asociados a una evaluación que
deben mostrarse en la vista de evaluaciones, cuando se va a editar
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "id_sub_componente": 1,
    "id_sub_componente": 1,
    "id_componente_evaluacion": "50"
    } ...
]
```

Si no se encuentran resultados devolver.

```Javascript
[]
```

### GET /esfoder/obtenerEscalaValorativa/:idEvaluacion

Esta solicitud consulta las escalas valorativas asociados a una evaluación que
deben mostrarse en la vista de evaluaciones, cuando se va a editar
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "id_nivel_evaluacion": 1,
    "id_evaluacion": 1,
    "porcentaje_desde": 0,
    "porcentaje_hasta": 20,
    "activo": 1
    } ...
]
```

Si no se encuentran resultados devolver.

```Javascript
[]
```

#### --

#### Método POST para ESFODER Evaluación de Rendimiento

### POST /esfoder/guardarEditarEvaluacion

Esta solicitud envía los datos para la edición y/o actualización de una Evaluación,
es importante indicar que para l actualización, se enviarán NULL (vacio)
los atributos [ id ] para las tablas:
[evaluacion, escalas_valorativas, componente_evaluacion, sub_componente_evaluacion],
de acuerdo a su dependencia una de otra, se deberá asignar el ID que se vaya registrando.

```Javascript
[
    {
        "id_evaluacion": 111,
        "codigo": "ECI-001",
        "descripcion": "Evaluación I Nivel ESFODER Natación 4-5 años",
        "id_nivel": 1,
        "porcentaje_aprobacion": 50,
        "id_usuario": 1,
        "escalas_valorativas": [
            {
                "id": 1,
                "id_evaluacion": 111,
                "id_nivel_evaluacion": 1,
                "id_usuario": 14,
                "porcentaje_desde": 0,
                "porcentaje_hasta": 10
            },
            {
                "id": 2,
                "id_evaluacion": 111,
                "id_nivel_evaluacion": 2,
                "id_usuario": 14,
                "porcentaje_desde": 11,
                "porcentaje_hasta": 50
            }...
        ],
        "componente_evaluacion": [
            {
                "id": 222,
                "id_componente": 1,
                "id_evaluacion": 111,
                "valor_componente": 30.2,
                "sub_componente_evaluacion": [
                    {
                        "id": 1,
                        "id_sub_componente": 1,
                        "id_componente_evaluacion": 222
                    },
                    {
                        "id": 2,
                        "id_sub_componente": 2,
                        "id_componente_evaluacion": 222
                    },
                    {
                        "id": 3,
                        "id_sub_componente": 3,
                        "id_componente_evaluacion": 222
                    }...
                ]
            },
            {
                "id": 555,
                "id_componente": 2,
                "id_evaluacion": 111,
                "valor_componente": 70.8,
                "sub_componente_evaluacion": [
                    {
                        "id": 4,
                        "id_sub_componente": 4,
                        "id_componente_evaluacion": 555
                    },
                    {
                        "id": 5,
                        "id_sub_componente": 5,
                        "id_componente_evaluacion": 555
                    }...
                ]
            }...
        ]
    }
]
```
