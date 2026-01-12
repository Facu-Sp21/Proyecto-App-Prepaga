CREATE TABLE afiliado (
    nro_afiliado NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dni_numero   VARCHAR2(8) NOT NULL,
    dni_tipo     VARCHAR2(10) NOT NULL,
    nombre       VARCHAR2(50) NOT NULL,
    apellido     VARCHAR2(50) NOT NULL,
    email        VARCHAR2(100),
    CONSTRAINT uq_afiliado_dni UNIQUE (dni_numero, dni_tipo)
);

CREATE TABLE especialista(
    nro_matricula VARCHAR2(12) NOT NULL PRIMARY KEY,
    nombre       VARCHAR2(50) NOT NULL,
    apellido     VARCHAR2(50) NOT NULL ,
    sueldo_base NUMBER(10,2)NOT NULL
);

CREATE TABLE especialidad(
    id_especialidad NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(40) NOT NULL
);

CREATE TABLE especialista_especialidad(
    id_especialidad NUMBER NOT NULL,
    nro_matricula VARCHAR2(12) NOT NULL,
    
    CONSTRAINT pk_especialista_especialidad PRIMARY KEY (id_especialidad,nro_matricula),
    
    CONSTRAINT fk_especialidad FOREIGN KEY (id_especialidad)
        REFERENCES especialidad(id_especialidad),
    CONSTRAINT fk_especialista FOREIGN KEY (nro_matricula)
        REFERENCES especialista(nro_matricula)
);

CREATE TABLE estado_turno (
    id_estado NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    descripcion VARCHAR2(15) NOT NULL
);


CREATE TABLE turno (
    id_turno NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    nro_afiliado NUMBER NOT NULL,
    nro_matricula VARCHAR2(12) NOT NULL,
    fecha_hora DATE NOT NULL,
    estado NUMBER NOT NULL,
    CONSTRAINT fk_turno_nro_afiliado FOREIGN KEY (nro_afiliado) 
        REFERENCES afiliado(nro_afiliado),
    CONSTRAINT fk_turno_nro_matricula FOREIGN KEY (nro_matricula) 
        REFERENCES especialista(nro_matricula),
    CONSTRAINT fk_turno_estado FOREIGN KEY (estado)
        REFERENCES estado_turno(id_estado),
        
    CONSTRAINT uk_fecha_afiliado_matricula UNIQUE (nro_afiliado, nro_matricula,fecha_hora)
    );


CREATE TABLE historia_clinica (
    id_hc NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nro_afiliado NUMBER NOT NULL,
    medicamentos_actuales VARCHAR2(200) NULL,
    antecedentes_familiares VARCHAR2(300) NULL,
    patologias VARCHAR2(300) NULL,
    tipo_de_sangre VARCHAR2(3) NOT NULL,
    alergias VARCHAR2(200) NULL ,
    contacto_emergencia VARCHAR2(20) NOT NULL,
    
    CONSTRAINT fk_hc_afiliado FOREIGN KEY (nro_afiliado)
        REFERENCES afiliado (nro_afiliado)
);

CREATE TABLE vacuna (
    id_vacuna NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(20) NOT NULL UNIQUE
);

CREATE TABLE hc_vacuna (
    id_hc NUMBER NOT NULL,
    id_vacuna NUMBER NOT NULL,
    fecha_aplicacion DATE NOT NULL,
    
    CONSTRAINT pk_historia_clinca_vacunas PRIMARY KEY (id_hc, id_vacuna),
    CONSTRAINT fk_historia_clinica FOREIGN KEY (id_hc) 
        REFERENCES historia_clinica (id_hc),
    CONSTRAINT fk_vacuna FOREIGN KEY (id_vacuna) 
        REFERENCES vacuna (id_vacuna)
);

CREATE TABLE tipo_prestacion (
    id_tipo_prestacion NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(20) NOT NULL
) ;

CREATE TABLE prestacion(
    id_prestacion NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo_prestacion NUMBER NOT NULL,
    nombre VARCHAR2(40) NOT NULL,
    
    CONSTRAINT fk_prestacion_tipo_prestacion FOREIGN KEY (tipo_prestacion)
        REFERENCES tipo_prestacion(id_tipo_prestacion)
    );

CREATE TABLE precio_prestacion(
    id_precio NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_prestacion NUMBER NOT NULL,
    valor NUMBER(9) NOT NULL,
    fecha_desde DATE NOT NULL,
    fecha_hasta DATE NOT NULL,
    
    CONSTRAINT uk_fecha_valor_prestacion UNIQUE(id_prestacion, fecha_desde),
    CONSTRAINT chk_fechas_precio_prestacion CHECK (fecha_hasta > fecha_desde),
    CONSTRAINT fk_precio_prestacion FOREIGN KEY (id_prestacion)
        REFERENCES prestacion(id_prestacion)
    );
    
CREATE TABLE registro_clinico(
    id_rc NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_hc NUMBER NOT NULL,
    nro_matricula VARCHAR2(12) NOT NULL,
    id_prestacion NUMBER NOT NULL,
    fecha_registro DATE NOT NULL,
    
    
    CONSTRAINT fk_rc_hc FOREIGN KEY (id_hc)
        REFERENCES historia_clinica(id_hc),
    CONSTRAINT fk_rc_especialista FOREIGN KEY (nro_matricula)
        REFERENCES especialista(nro_matricula),
    CONSTRAINT fk_rc_prestacion FOREIGN KEY (id_prestacion)
        REFERENCES prestacion(id_prestacion)
);


CREATE TABLE estudio(
    id_prestacion NUMBER PRIMARY KEY,
    descripcion VARCHAR2(100) NULL,
    CONSTRAINT fk_estudio_prestacion FOREIGN KEY (id_prestacion)
        REFERENCES prestacion(id_prestacion)
);

CREATE TABLE estudio_rc(
    id_estudio NUMBER,
    id_rc NUMBER,
    fecha_realizacion DATE NOT NULL,
    resultados VARCHAR2(500) NOT NULL,
    observaciones VARCHAR2(300) NULL,
    
    CONSTRAINT pk_estudio_rc PRIMARY KEY (id_estudio, id_rc),
    
    CONSTRAINT fk_estudio FOREIGN KEY (id_estudio)
        REFERENCES estudio(id_prestacion),
    CONSTRAINT fk_estudio_rc FOREIGN KEY (id_rc)
        REFERENCES registro_clinico(id_rc)
    );

CREATE TABLE medicamento(
    id_prestacion NUMBER PRIMARY KEY,
    presentacion VARCHAR2(50) NOT NULL,
    laboratorio VARCHAR2(50) NOT NULL,
    
    CONSTRAINT fk_medicamento_prestacion FOREIGN KEY (id_prestacion)
        REFERENCES prestacion(id_prestacion)
);

CREATE TABLE medicamento_rc(
    id_medicamento NUMBER NOT NULL,
    id_rc NUMBER NOT NULL,
    cantidad NUMBER NOT NULL,
    indicaciones VARCHAR2(150) NOT NULL,
    
    CONSTRAINT pk_medicamento_rc PRIMARY KEY(id_medicamento,id_rc),
    
    CONSTRAINT fk_medicamento FOREIGN KEY (id_medicamento)
        REFERENCES medicamento(id_prestacion),
    CONSTRAINT fk_medicamento_rc FOREIGN KEY (id_rc)
        REFERENCES registro_clinico(id_rc)
);

CREATE TABLE consulta(
    id_prestacion NUMBER PRIMARY KEY,
    id_especialidad NUMBER NOT NULL,
    
    CONSTRAINT uk_consulta_especialidad UNIQUE (id_especialidad),
    
    CONSTRAINT fk_consulta_prestacion FOREIGN KEY (id_prestacion)
        REFERENCES prestacion(id_prestacion)
);

CREATE TABLE consulta_rc(
    id_consulta NUMBER NOT NULL,
    id_rc NUMBER NOT NULL,
    motivo_consulta VARCHAR2(20) NOT NULL,
    observaciones VARCHAR2(500) NOT NULL,
    diagnostico VARCHAR2(500) NULL,
    fecha_consulta DATE NOT NULL,
    
    CONSTRAINT pk_consulta_rc PRIMARY KEY (id_consulta, id_rc),
    
    CONSTRAINT fk_consulta FOREIGN KEY (id_consulta)
        REFERENCES consulta(id_prestacion),
    CONSTRAINT fk_consulta_rc FOREIGN KEY (id_rc)
        REFERENCES registro_clinico(id_rc)
);

CREATE TABLE tratamiento(
    id_prestacion NUMBER PRIMARY KEY,
    
    CONSTRAINT fk_tratamiento_prestacion FOREIGN KEY (id_prestacion)
        REFERENCES prestacion(id_prestacion)
);

CREATE TABLE tratamiento_rc(
    id_tratamiento NUMBER NOT NULL,
    id_rc NUMBER NOT NULL,
    cantidad_seciones NUMBER(3) NULL,
    respuesta_paciente VARCHAR2(300) NOT NULL,
    
    CONSTRAINT pk_tratamiento_rc PRIMARY KEY (id_tratamiento, id_rc),
    
    CONSTRAINT fk_tratamiento FOREIGN KEY (id_tratamiento)
        REFERENCES tratamiento(id_prestacion),
    CONSTRAINT fk_tratamiento_rc FOREIGN KEY (id_rc)
        REFERENCES registro_clinico(id_rc)

);

CREATE TABLE plan(
    id_plan NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(20)NOT NULL,
    descripcion VARCHAR2(200) NOT NULL
);

CREATE TABLE precio_plan(
    id_precio NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_plan NUMBER NOT NULL,
    fecha_desde DATE NOT NULL,
    fecha_hasta DATE NOT NULL,
    valor NUMBER(8) NOT NULL,
    
    CONSTRAINT uk_fecha_valor UNIQUE(id_plan, fecha_desde),
    CONSTRAINT chk_fechas_precio_plan CHECK (fecha_hasta > fecha_desde),
    
    CONSTRAINT fk_precio_plan FOREIGN KEY (id_plan)
        REFERENCES plan(id_plan)
    );
    
CREATE TABLE  beneficio(
    id_beneficio NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo_beneficio VARCHAR2(50) NOT NULL
);

CREATE TABLE beneficio_plan (
    id_plan NUMBER NOT NULL,
    id_beneficio NUMBER NOT NULL,
    cantidad_descuento NUMBER NOT NULL,
    fecha_desde DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    
    CONSTRAINT pk_beneficio_plan PRIMARY KEY (id_plan,id_beneficio),
    
    CONSTRAINT fk_beneficio_plan_beneficio FOREIGN KEY (id_beneficio)
        REFERENCES beneficio(id_beneficio),
    CONSTRAINT fk_beneficio_plan_plan FOREIGN KEY (id_plan)
        REFERENCES plan(id_plan)     
    );

CREATE TABLE afiliado_plan (
    id_plan NUMBER NOT NULL,
    nro_afiliado NUMBER NOT NULL,
    fecha_hasta DATE NOT NULL,
    fecha_desde DATE NOT NULL,
    
    CONSTRAINT pk_afiliado_plan PRIMARY KEY (id_plan, nro_afiliado, fecha_desde),
    
    CONSTRAINT chk_fechas_precio CHECK (fecha_hasta > fecha_desde),
    
    CONSTRAINT fk_afiliado_plan_plan FOREIGN KEY (id_plan)
        REFERENCES plan(id_plan),
    CONSTRAINT fk_afiliado_plan_nro_afiliado FOREIGN KEY (nro_afiliado)
        REFERENCES afiliado(nro_afiliado)
    );
    
CREATE TABLE factura(
    id_factura NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nro_afiliado NUMBER NOT NULL,
    periodo_desde DATE NOT NULL,
    periodo_hasta DATE NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    
    CONSTRAINT fk_factura_nro_afiliado FOREIGN KEY (nro_afiliado)
        REFERENCES afiliado(nro_afiliado)
    );
    
CREATE TABLE factura_item(
    id_item NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_factura NUMBER NOT NULL,
    descripcion VARCHAR2(100) NULL,
    cantidad NUMBER(4) NOT NULL,
    precio_unitario NUMBER(8) NOT NULL,
    porcentaje_desc NUMBER(3) NULL,
    total NUMBER(8) NOT NULL,
    
    CONSTRAINT fk_factura_item_factura FOREIGN KEY (id_factura)
        REFERENCES factura(id_factura)
);

