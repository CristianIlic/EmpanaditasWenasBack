export const GET_ALL_EMPANADAS = `SELECT 
    e.empanada_id as empanada_id,
    e.empanada_name as empanada_name,
    e.empanada_description as empanada_description,
    e."photoName",
    e.preparation_time,
    e.servings,
    e.difficulty,
    json_agg( 
        DISTINCT jsonb_build_object(
            'ingredient_name', ei.ingredient,
            'quantity', ei.quantity,
            'unit', ei.unit,
            'notes', ei.notes
        )
    ) as ingredients,
    json_agg(
        DISTINCT jsonb_build_object(
            'step_number', ps.step_number,
            'description', ps.preparation_steps_description
        )
    ) as preparation_steps
FROM empanadas e
LEFT JOIN empanadas_ingredient ei ON e.empanada_id = ei.empanada_id
LEFT JOIN preparation_steps ps ON e.empanada_id = ps.empanada_id
WHERE e.empanada_id = e.empanada_id
GROUP BY 
    e.empanada_id,
    e.empanada_name,
    e.empanada_description,
    e."photoName",
    e.preparation_time,
    e.servings,
    e.difficulty;
`