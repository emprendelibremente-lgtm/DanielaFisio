# Daniela Ferreira — Fisioterapia y Rehabilitación

Web pública y dashboard privado para Daniela Ferreira.

## Estado actual

- Web pública profesional y responsive.
- Dashboard privado en `/private`.
- Login real en `/login` con Supabase Auth.
- Rutas privadas protegidas con middleware y cookies SSR.
- CRUD básico preparado para pacientes, citas, sesiones y bonos.
- Bonos limitados a `Bono de 5 sesiones`.
- Agenda semanal con horario configurable desde `scheduleStartHour` y `scheduleEndHour` en `src/data/privateConfig.ts`.
- Datos mock conservados solo como fallback local de desarrollo en `src/data/mockPrivate.ts`. Con Supabase configurado, el dashboard lee datos reales de la base.

## Aviso de seguridad

Uso controlado. No ingresar datos sensibles, informes médicos ni diagnósticos extensos hasta completar y revisar privacidad, textos legales, consentimiento del paciente y configuración completa de seguridad.

Los datos de salud requieren especial cuidado. No guardar informes médicos, documentos clínicos ni diagnósticos extensos en esta fase.

Este sistema puede contener datos de salud. Antes de usarlo con pacientes reales, se debe revisar cumplimiento de RGPD/AEPD, política de privacidad, base legal del tratamiento, conservación de datos y medidas de seguridad.

## Configurar Supabase

1. Crear un proyecto en Supabase.
2. Ejecutar el SQL de `supabase/migrations/001_initial_private_schema.sql`.
3. Ejecutar el SQL de `supabase/migrations/002_grant_authenticated_private_tables.sql`.
4. Activar/confirmar Row Level Security en todas las tablas privadas.
5. Crear manualmente el usuario de Daniela en Supabase Auth.
6. Desactivar o limitar el registro público desde el dashboard de Supabase.
7. Copiar `.env.example` a `.env.local`.

Los `GRANT` permiten que el rol `authenticated` pueda operar sobre las tablas.
RLS sigue activo y las policies limitan cada operación a los datos del usuario
autenticado mediante `owner_id = auth.uid()`.

Variables necesarias:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DANIELA_ALLOWED_EMAIL=
```

No usar `SUPABASE_SERVICE_ROLE_KEY` en frontend. Si algún día se usa, debe quedar limitado a scripts seguros del servidor.

## Probar login y dashboard

```bash
npm run dev
```

Abrir `/login`, entrar con el email de Daniela y contraseña creada en Supabase Auth.

- Si no hay sesión, `/private` redirige a `/login`.
- Si hay sesión válida y el email coincide con `DANIELA_ALLOWED_EMAIL`, `/login` redirige a `/private`.
- Si el email no coincide, se cierra sesión y se bloquea el acceso.
- Si `DANIELA_ALLOWED_EMAIL` no está configurado, el área privada no queda abierta por accidente.
- La app no incluye pantalla de registro público. Revisar en Supabase Auth que el signup público esté desactivado o controlado.

## Probar CRUD

- Crear paciente: `/private/pacientes/nuevo`
- Editar paciente: `/private/pacientes/[id]/editar`
- Crear cita: `/private/agenda/nueva`
- Cambiar estado de cita: botones en cards de citas
- Registrar sesión: `/private/sesiones/nueva`
- Crear bono de 5 sesiones: `/private/bonos/nuevo`
- Descontar sesión: botón en cada bono

## Pruebas manuales de seguridad

Hacer estas pruebas con datos ficticios antes de usar información real:

- Usuario autorizado puede crear un paciente y verlo en `/private/pacientes`.
- Usuario autorizado puede crear una cita y verla en `/private/agenda`.
- Usuario autorizado solo ve registros con su `owner_id`.
- Usuario no autorizado no puede acceder a `/private` y vuelve a `/login`.
- Sin sesión, `/private` redirige a `/login`.
- Desde Supabase SQL Editor, confirmar que no se pueden insertar filas privadas sin `owner_id` válido.
- Desde Supabase SQL Editor, confirmar que patients, appointments, treatment_sessions y session_packages respetan `owner_id = auth.uid()`.
- Confirmar que profiles solo permite leer, insertar o actualizar el perfil propio.
- Confirmar que `anon` no tiene grants directos sobre tablas privadas.

## Antes de usar con pacientes reales

- RLS verificado en `profiles`, `patients`, `appointments`, `treatment_sessions` y `session_packages`.
- Usuario autorizado configurado en `DANIELA_ALLOWED_EMAIL`.
- Signup público desactivado o controlado desde Supabase Auth.
- Variables de entorno configuradas en local y producción.
- Región del proyecto Supabase revisada.
- Backups de Supabase revisados y activados según el plan contratado.
- Textos legales pendientes de revisión profesional.
- Política de privacidad pendiente de revisión profesional.
- Consentimiento e información al paciente pendiente de revisión profesional.
- Revisión RGPD/AEPD pendiente antes de guardar datos de salud reales.

## Primer uso real controlado

Para una primera prueba interna con datos reales mínimos:

- Usar solo el email autorizado de Daniela.
- Crear 1 paciente de prueba real con datos mínimos: nombre, teléfono si hace falta y lesión principal breve.
- Crear 1 cita dentro del horario 7:00 a 21:00.
- Registrar 1 sesión con notas breves, sin informes médicos ni diagnósticos extensos.
- Crear 1 bono de 5 sesiones solo si se necesita controlar sesiones restantes.
- Comprobar que la agenda semanal muestra la cita en la semana actual.
- Comprobar que la ficha del paciente muestra próxima cita, última sesión y bono activo si existe.
- Confirmar que WhatsApp abre el mensaje correcto antes de contactar.
- No subir documentos clínicos ni usar la app como historia clínica completa en esta fase.
- Revisar después de la prueba si los textos, campos y navegación son suficientes para el trabajo diario.
- Para datos reales, evaluar si conviene alta/archivo en lugar de eliminación definitiva.

## Migraciones del Segmento 3.4

Ejecutar también `supabase/migrations/003_treatment_sessions_appointment_link.sql`.
Esta migración agrega `appointment_id` opcional a las sesiones para vincular una
sesión con su cita, marcar la cita como completada y evitar sesiones duplicadas
para la misma cita. No desactiva RLS ni modifica las policies existentes.

## Migraciones del Segmento 6

Ejecutar también `supabase/migrations/004_session_financials_and_reports.sql`.
Esta migración agrega campos económicos manuales a `treatment_sessions`:
duración, precio base, descuento, total pagado, método de pago y notas de pago.
No crea pagos online, facturación ni modifica RLS.

## Comandos

```bash
npm run lint
npm run build
npm run dev
```

## Preview al compartir en WhatsApp

La imagen de Open Graph debe existir en `public/og-daniela-fisio.png` y estar
publicada en `https://daniela-fisio.vercel.app/og-daniela-fisio.png`.

Si WhatsApp muestra una preview antigua después de desplegar:

- Probar con `https://daniela-fisio.vercel.app/?v=2`.
- Esperar unos minutos después del deploy.
- Si se cambia la imagen, usar un nombre versionado, por ejemplo
  `/og-daniela-fisio-v2.png`, y actualizar la metadata.

## Pendiente para próximas fases

- Revisión legal y privacidad.
- UX final de formularios y mensajes de error.
- Validaciones más completas.
- Auditoría de políticas RLS con datos reales de prueba.
- Protección avanzada de acciones del servidor.
- Portal de pacientes, pagos, facturación y biblioteca de ejercicios siguen fuera de alcance.
