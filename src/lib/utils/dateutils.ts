import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localeData";
import "dayjs/locale/es"; // Cambia a tu idioma preferido

dayjs.extend(duration);
dayjs.extend(localizedFormat);

export function calcularDuracionProyecto(
  fechaInicioISO,
  fechaFinISO,
  locale = "es",
) {
  dayjs.locale(locale); // Configura el idioma

  const fechaInicio = dayjs(fechaInicioISO);
  const fechaFin = dayjs(fechaFinISO);

  if (
    !fechaInicio.isValid() ||
    !fechaFin.isValid() ||
    fechaInicio.isAfter(fechaFin)
  ) {
    return "Fechas inválidas";
  }

  const diferencia = dayjs.duration(fechaFin.diff(fechaInicio));

  const años = diferencia.years();
  const meses = diferencia.months();
  const semanas = Math.floor(diferencia.asWeeks());

  if (años > 0 || meses > 0) {
    // Más de 1 mes, expresar en años y meses
    const partes: string[] = [];
    if (años > 0) partes.push(`${años} año${años > 1 ? "s" : ""}`);
    if (meses > 0) partes.push(`${meses} mes${meses > 1 ? "es" : ""}`);
    return partes.join(" y ");
  }

  // Menos de un mes, expresar en semanas
  return `${semanas} semana${semanas > 1 ? "s" : ""}`;
}
