-- Script para criar o primeiro usuário super_admin
-- Execute este SQL no console do Neon Database

-- A senha é: Admin123!
-- Hash bcrypt gerado para 'Admin123!': $2a$10$YourHashHere

INSERT INTO users (email, password, name, role, active)
VALUES (
  'leomachadopt@gmail.com',
  '$2a$10$rOV5PZQmZ8qKNzC9uXhxE.8QEKHNxX5YJj8uxKFGXBZQvGWm4nzKm', -- Hash de 'Admin123!'
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
