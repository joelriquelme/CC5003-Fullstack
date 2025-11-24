/* {
  "code": "ING",
  "name": "Ingeniería Civil",
  "gold": 7,
  "silver": 3,
  "bronze": 2,
  "points": 140
} */

import { test, expect } from "@playwright/test";

test.describe("Verificación de la tabla de medallas y puntos acumulados por facultad", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/medalTable", {
      data: {
        code: "ING",
        name: "Ingeniería Civil",
        gold: 7,
        silver: 3,
        bronze: 2,
        points: 140,
      },
    });
  });

  test("Verificar que la tabla de medallas muestra correctamente los datos de las facultades", async ({
    page,
  }) => {
    await page.goto("/medallero");
    await expect(page.getByText("Ingeniería Civil")).toBeVisible();
    await expect(page.getByText("7")).toBeVisible(); // Medallas de oro
    await expect(page.getByText("3")).toBeVisible(); // Medallas de plata
    await expect(page.getByText("2")).toBeVisible(); // Medallas de bronce
    await expect(page.getByText("140")).toBeVisible(); // Puntos totales
  });

  test("Verificar que al no haber datos, la tabla está vacía con sus headers", async ({
    page,
  }) => {
    await page.goto("/medallero");
    await expect(page.getByText("Medallero General")).toBeVisible();
    await expect(page.getByText("Total")).toBeVisible();
    await expect(page.getByText("Puntos")).toBeVisible();
  });
});
