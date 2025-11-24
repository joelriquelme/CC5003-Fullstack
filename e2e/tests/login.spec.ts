import { test, expect } from "@playwright/test";

test.describe("Flujo de inicios y registros de usuarios en la aplicación", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        username: "user1",
        name: "User One",
        password: "password1",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Flujo exitoso de registro de usuario válido", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("username").fill("user1");
    await page.getByLabel("name").fill("User One");
    await page.getByLabel("password").fill("password1");
    await page.getByRole("button", { name: "Crear Usuario" }).click();

    await expect(page.getByText("Usuario creado exitosamente")).toBeVisible();
    await page.waitForTimeout(3000); // Esperamos 3 segundos para ver el cambio de página de vuelta al login
    await expect(page.getByText("Iniciar sesión")).toBeVisible();
  });

  test("Flujo erróneo de inicio de sesión con usuario inexistente", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByText("Usuario").fill("wrongUser");
    await page.getByText("Contraseña").fill("wrongPass");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page.locator("text=Credenciales inválidas")).toBeVisible();
  });

  test("Flujo exitoso de inicio de sesión con usuario válido", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByText("Usuario").fill("user1");
    await page.getByText("Contraseña").fill("password1");
    await page.getByRole("button", { name: "Entrar" }).click();
  });
});
