**Requisitos Funcionais => RF**

**Requisitos não Funcionais => RNF**

**Regras de Negócio => RN**

## Cadatro de carro

**RF**
- [] Deve ser possível cadastrar um novo carro.

**RN**
- [] Somente um usuário administrador pode fazer o cadastro.
- [] Não deve ser possível cadastrar um carro com placa já existente.
- [] Não deve ser possível alterar a placa de um carro já cadastrado.
- [] O carro deve ser cadastrado com disponibilidade para ser alugado.

## Listagem de carros

**RF**
- [] Deve ser possível listar todos os carros disponíveis.
- [] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- [] O usuário não precisa estar logado no sistema.

## Cadastro de especificação no carro

**RF**
- [] Deve ser possível cadastrar uma especificação para um carro.
- [] Deve ser possível listar todas as especificações.
- [] Deve ser possível listar todos os carros.

**RN**
- [] Somente usuário administrador pode fazer o cadastro.
- [] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [] Não deve ser possível cadastrar uma especificação para um carro não existente.

## Cadastro de imagens do carro

**RF**
- [] Deve ser possível cadastrar a imagem do carro.
- [] Deve ser possível listar todos os carros sem restrição.

**RNF**
- [] Utilizar o multer para o upload.

**RN**
- [] Somente usuário administrador pode fazer o cadastro da imagem. 
- [] Deve ser possível cadastrar mais de uma imagem para o mesmo carro.

## Aluguel de carro

**RF**
- [] Deve ser possível cadastrar um aluguel.

**RN**
- [] O aluguel deve ter duração miníma de 24 horas.
- [] Não deve ser possível cadastrar um aluguel caso já exista para o mesmo carro.
- [] Não deve ser possível cadastrar um aluguel caso já exista para o mesmo usuário.
