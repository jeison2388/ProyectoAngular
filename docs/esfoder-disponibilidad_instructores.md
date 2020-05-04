### MÉTODOS GET PARA ESFODER Disponibilidad Instructores

### GET /esfoder/obtenerSubProgramas

Esta solicitud consulta el catalogo de SUB programas [activos?] que
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

### GET /esfoder/obtenerUnidades

Esta solicitud consulta el catalogo de Unidades [activos?] que
deben mostrarse en la vista de instructores esfoder.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "unidad": "Centro recreativo pisoje"
    } ...
]
```

Si no se encuentran niveles devolver.

```Javascript[]

```

### GET /esfoder/obtenerDiaSemana

Esta solicitud consulta los días de la semana que
deben mostrarse en la vista de instructores esfoder.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "codigo": "L"
    "descripcion": "Lunes",
    "activo": 1
    } ...
]
```

Si no se encuentran niveles devolver.

```Javascript[]

```

### GET /obtenerPersonaPorIdentificacion/:identificacion

Esta solicitud consulta si existe una persona registrada en el sistema a partir de
un número de identificación
El sistema debe responder con un único objeto JSON de la siguiente manera

```Javascript

[
    {
        "id": 1,
        "primer_nombre": "EDUAR",
        "primer_apellidp": "NARVAEZ",
        "segundo_nombre": "ALEJANDRO",
        "segundo_apellido": "VELASCO",
        "identificacion": "10617215963",
        "fecha_nacimiento": "14/06/1993",
        "direccion_residencia": "calle falsa 123",
        "celular": "3181364598",
        "correo_electronico": "falso@dominio.com",
        "id_genero": 1,
        "id_tipo_identificacion": 1,
        "id_archivo": 1,
        "nombre_archivo": "foto1.jpg",
        "url": "http://pruebasweb.comfacauca.com/uploads/fortos/1/"
    }
]
```

Si no se encuentran componentes devolver.

```Javascript

[]
```

### GET /esfoder/obtenerInstructor/:idInstructorDisponibilidad

Esta solicitud consulta una evaluación que
deben mostrarse en la vista de evaluaciones, cuando se va a editar
El sistema debe responder con un único objeto JSON de la siguiente manera

```Javascript
[
    {
        "id_instructor": 111,
        "id_persona": 222,
        "primer_nombre": "EDUAR",
        "primer_apellido": "NARVAEZ",
        "segundo_nombre": "ALEJANDRO",
        "segundo_apellido": "VELASCO",
        "identificacion": "10617215963",
        "fecha_nacimiento": "14/06/1993",
        "direccion_residencia": "calle falsa 123",
        "celular": "3181364598",
        "correo_electronico": "falso@dominio.com",
        "id_genero": 1,
        "id_tipo_identificacion": 1
    }
]
```

Si no se encuentran resultados devolver.

```Javascript

[]
```

### GET /esfoder/obtenerDisponibilidadInstructor/:idInstructorDisponibilidad

Esta solicitud consulta la disponibilidad d eun istructur, obteniendo los datos a aprtid del ID del instructorDisponibilidad.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
    {
        "id_disponibilidad": 1,
        "id_instructor": 111,
        "id_unidad": 222,
        "id_dia_semana": "1",
        "horario_1_i": "08:00:00",
        "horario_1_f": "10:00:00",
        "horario_2_i": "14:00:00",
        "horario_2_f": "18:00:00",
        "activo": 1,
        "id_usuario": 1
    },
    {
        "id_disponibilidad": 2,
        "id_instructor": 111,
        "id_unidad": 222,
        "id_dia_semana": "2",
        "horario_1_i": "08:00:00",
        "horario_1_f": "10:00:00",
        "horario_2_i": "14:00:00",
        "horario_2_f": "18:00:00",
        "activo": 1,
        "id_usuario": 1
    }...
]
```

Si no se encuentran resultados devolver.

```Javascript

[]
```

#### --

#### Método POST para ESFODER Disponibilidad Instructores

### POST /esfoder/guardarEditarDisponibilidadInstructor

Esta solicitud envía los datos para la creación y/o actualización de una Disponibilidad de instructor,
es importante indicar que para l actualización, se enviarán NULL (vacio)
los atributos [ id ] para las tablas:
[disponibilidad_instructor, instructor, persona],
de acuerdo a su dependencia una de otra, se deberá asignar el ID que se vaya registrando.

```Javascript
[
    {
        "id": 111,
        "idpersona": 2,
        "id_subprograma": 1,
        "persona": {
            "id": 1,
            "primer_nombre": "EDUAR",
            "primer_apellidp": "NARVAEZ",
            "segundo_nombre": "ALEJANDRO",
            "segundo_apellido": "VELASCO",
            "identificacion": "10617215963",
            "fecha_nacimiento": "14/06/1993",
            "direccion_residencia": "calle falsa 123",
            "celular": "3181364598",
            "correo_electronico": "falso@dominio.com",
            "id_genero": 1,
            "id_tipo_identificacion": 1,
            "identificacion": "1061721560",
            "archivo": {
                "id": 1,
                "nombre_archivo": "foto1.jpg",
                "url": "http://pruebasweb.comfacauca.com/uploads/fortos/1/"
            }
        },
        "disponobilidad_instructor": [
            {
                "id": 1,
                "id_instructor": 111,
                "id_unidad": 222,
                "id_dia_semana": 1,
                "horario_1_i": "08:00:00",
                "horario_1_f": "10:00:00",
                "horario_2_i": "14:00:00",
                "horario_2_f": "18:00:00",
                "activo": 1,
                "id_usuario": 1
            },
            {
                "id": 2,
                "id_instructor": 111,
                "id_unidad": 222,
                "id_dia_semana": 2,
                "horario_1_i": "08:00:00",
                "horario_1_f": "10:00:00",
                "horario_2_i": "14:00:00",
                "horario_2_f": "18:00:00",
                "activo": 1,
                "id_usuario": 1
            }
        ]
    }
]
```
