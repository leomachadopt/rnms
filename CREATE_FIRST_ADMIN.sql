-- Script para criar o primeiro usuário super_admin
-- A senha é: Admin123!

INSERT INTO users (email, password, name, role, active)
VALUES (
  'leomachadopt@gmail.com',
  '$2b$10$GhrNTT8nHB1KXcR6TSOo8.PYya3VQOky2nV908dCXI7Q9cPmvZMry', -- Hash de 'Admin123!'
  'Leonardo Machado',
  'super_admin',
  1
)
ON CONFLICT (email)
DO UPDATE SET
  password = EXCLUDED.password,
  role = 'super_admin',
  updated_at = NOW();

-- Verificar se foi criado
SELECT id, email, name, role, active, created_at FROM users WHERE email = 'leomachadopt@gmail.com';
