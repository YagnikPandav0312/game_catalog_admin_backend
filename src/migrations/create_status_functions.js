const pool = require("../config/db");

const functions = [
  // 1. Providers
  `
  CREATE OR REPLACE FUNCTION public.update_provider_status(p_id integer, p_status boolean)
   RETURNS TABLE(message character varying, code integer)
   LANGUAGE plpgsql
  AS $function$
        BEGIN
            IF EXISTS(
                SELECT 1 FROM public.providers WHERE provider_id = p_id AND (is_delete = false OR is_delete IS NULL)
            )
            THEN
                UPDATE public.providers
                SET
                    is_active = p_status,
                    updated_by = 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE provider_id = p_id;

                RETURN QUERY
                SELECT
                    (CASE WHEN p_status = true THEN 'Provider Activated Successfully.' ELSE 'Provider Deactivated Successfully.' END)::VARCHAR,
                    0;
            ELSE
                RETURN QUERY
                SELECT
                    'Provider does not exist.'::VARCHAR,
                    1;
            END IF;
        END;
        $function$;
  `,
  // 2. Device Types
  `
  CREATE OR REPLACE FUNCTION public.update_device_type_status(p_id integer, p_status boolean)
   RETURNS TABLE(message character varying, code integer)
   LANGUAGE plpgsql
  AS $function$
        BEGIN
            IF EXISTS(
                SELECT 1 FROM public.device_types WHERE device_type_id = p_id AND (is_delete = false OR is_delete IS NULL)
            )
            THEN
                UPDATE public.device_types
                SET
                    is_active = p_status,
                    updated_by = 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE device_type_id = p_id;

                RETURN QUERY
                SELECT
                    (CASE WHEN p_status = true THEN 'Device Type Activated Successfully.' ELSE 'Device Type Deactivated Successfully.' END)::VARCHAR,
                    0;
            ELSE
                RETURN QUERY
                SELECT
                    'Device Type does not exist.'::VARCHAR,
                    1;
            END IF;
        END;
        $function$;
  `,
  // 3. Game Categories
  `
  CREATE OR REPLACE FUNCTION public.update_game_category_status(p_id integer, p_status boolean)
   RETURNS TABLE(message character varying, code integer)
   LANGUAGE plpgsql
  AS $function$
        BEGIN
            IF EXISTS(
                SELECT 1 FROM public.game_categories WHERE game_categorie_id = p_id AND (is_delete = false OR is_delete IS NULL)
            )
            THEN
                UPDATE public.game_categories
                SET
                    is_active = p_status,
                    updated_by = 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE game_categorie_id = p_id;

                RETURN QUERY
                SELECT
                    (CASE WHEN p_status = true THEN 'Game Category Activated Successfully.' ELSE 'Game Category Deactivated Successfully.' END)::VARCHAR,
                    0;
            ELSE
                RETURN QUERY
                SELECT
                    'Game Category does not exist.'::VARCHAR,
                    1;
            END IF;
        END;
        $function$;
  `,
  // 4. Game Types
  `
  CREATE OR REPLACE FUNCTION public.update_game_type_status(p_id integer, p_status boolean)
   RETURNS TABLE(message character varying, code integer)
   LANGUAGE plpgsql
  AS $function$
        BEGIN
            IF EXISTS(
                SELECT 1 FROM public.game_types WHERE game_type_id = p_id AND (is_delete = false OR is_delete IS NULL)
            )
            THEN
                UPDATE public.game_types
                SET
                    is_active = p_status,
                    updated_by = 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE game_type_id = p_id;

                RETURN QUERY
                SELECT
                    (CASE WHEN p_status = true THEN 'Game Type Activated Successfully.' ELSE 'Game Type Deactivated Successfully.' END)::VARCHAR,
                    0;
            ELSE
                RETURN QUERY
                SELECT
                    'Game Type does not exist.'::VARCHAR,
                    1;
            END IF;
        END;
        $function$;
  `,
  // 5. Games
  `
  CREATE OR REPLACE FUNCTION public.update_game_status(p_id integer, p_status boolean)
   RETURNS TABLE(message character varying, code integer)
   LANGUAGE plpgsql
  AS $function$
        BEGIN
            IF EXISTS(
                SELECT 1 FROM public.games WHERE game_id = p_id AND (is_delete = false OR is_delete IS NULL)
            )
            THEN
                UPDATE public.games
                SET
                    is_active = p_status,
                    updated_by = 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE game_id = p_id;

                RETURN QUERY
                SELECT
                    (CASE WHEN p_status = true THEN 'Game Activated Successfully.' ELSE 'Game Deactivated Successfully.' END)::VARCHAR,
                    0;
            ELSE
                RETURN QUERY
                SELECT
                    'Game does not exist.'::VARCHAR,
                    1;
            END IF;
        END;
        $function$;
  `
];

async function run() {
  try {
    console.log("Starting creation of status update stored functions...");
    for (let i = 0; i < functions.length; i++) {
      await pool.query(functions[i]);
      console.log(`Successfully created function ${i + 1}/${functions.length}`);
    }
    console.log("All status update stored functions successfully created!");
  } catch (err) {
    console.error("Failed to create functions:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
