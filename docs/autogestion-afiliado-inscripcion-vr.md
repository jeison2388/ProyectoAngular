### MÉTODOS GET para Autogestión Afiliados vacaciones Recreativas

### GET /autogestionAfiliado/obtenerProgramaVacacionesRecreativas

Esta solicitud consulta el catalogo de programas el que corresponda a 'vacacioens recreativas'
El sistema debe responder con un objeto JSON de la siguiente manera

```Javascript
{
    "id": 1,
    "programa": "Vacaciones Recreativas"
}

```

Si no se encuentran programas devolver.

```Javascript
[]
```

### GET /catalogo/obtenerTiposIdentificacion

Esta solicitud consulta el catalogo de Tipos de Identificación [activos?] que
deben mostrarse en la vista de inscripciones vacaciones recreativas.
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
   {
    "id": 1,
    "descripcion": "Cédula de Ciudadanía"
    } ...
]
```

Si no se encuentran niveles devolver.

```Javascript[]

```

### GET /consultaAfiliados/{idAfiliadoLogueado}

Esta solicitud consulta los afiliados de un núcleo familiar (Titular y Beneficiarios)
El sistema debe responder con un array de objetos JSON de la siguiente manera

```Javascript
[
    {
        "id_afiliado": 1,
        "estado": "ACTIVO",
        "titular": true,
        "categoria": "B",
        "url_foto": "/../../",
        "nombre_foto": "fotoAfiliado.png",
        "nombre": "EDUAR ALEJANDRO NARVAES RUIZ",
        "sexo": "M",
        "tipoSangre": "B+",
        "identificacion": "1061759636",
        "tipoidentificacion": "Registro Civil",
        "fechaNaciento": "14/12/1990",
        "edad": "30",
        "direccionResidencia": "calle falsa",
        "correo": "mail@gmail.com",
        "celular": "318958456",
        "razonSocial": "COMFACAUCA",
        "nit": "1234568-2"
    },...
]
```

Si no se encuentran niveles devolver.

```Javascript[]

```

#### --

#### Método POST  para Autogestión Afiliados vacaciones Recreativas

### POST /autogestionAfiliado/guardarVacacionRecreativa

Esta solicitud envía los datos para el registro de una programación de vacación recreativa,
los atributos [ id ] para las tablas:
[vacaciones_rec_afiliado, acudiente, vacaciones_red_afiliado],
de acuerdo a su dependencia una de otra, se deberá asignar el ID que se vaya registrando.

```Javascript
{
    "id": 88,
    "id_programa": 1,
    "fecha_inicio": "20/05/2020",
    "fecha_fin": "20/05/2020",
    "acudiente": {
        "id": 77,
        "nombres_apellidos": "EDUAR TROYANO",
        "id_tipo_identificacion": 1,
        "identificacion": "123456789",
        "celular": "318987456",
        "direccion": "CALLE FALSA 123",
        "telefono": "123456",
        "recomendacion": "NA",
        "vacaciones_red_afiliado": {
            "id": 10,
            "id_afiliado": 1,
            "id_vacaciones_rec": 88,
            "id_acudiente": 77,
            "dias": 5,
            "politicas1": true,
            "politicas2": true
        }
    }
}
```
