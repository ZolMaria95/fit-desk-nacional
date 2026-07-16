package com.fitdesk.etl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

/**
 * Resultado de una corrida del ETL: qué se insertó/actualizó por tabla y
 * qué no se pudo resolver (para revisión humana, sin inventar datos).
 * Es el "entregable verificable" de la Fase 2 en forma de JSON.
 */
public class EtlReport {

    /** Contador por tabla. */
    public static class Stat {
        public long insertados;
        public long actualizados;
    }

    public String snapshot;
    public String ejecutadoEn;
    public Map<String, Stat> tablas = new LinkedHashMap<>();
    public java.util.Set<String> clientesNoResueltos = new TreeSet<>();
    public java.util.Set<String> usuariosNoResueltos = new TreeSet<>();
    public List<String> advertencias = new ArrayList<>();

    private Stat stat(String tabla) {
        return tablas.computeIfAbsent(tabla, k -> new Stat());
    }

    public void insertado(String tabla) {
        stat(tabla).insertados++;
    }

    public void actualizado(String tabla) {
        stat(tabla).actualizados++;
    }

    public void advertencia(String msg) {
        advertencias.add(msg);
    }
}
