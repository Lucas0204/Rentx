**Requisitos Funcionais => RF**

**Requisitos não Funcionais => RNF**

**Regras de Negócio => RN**

## Cadatro de carro

**RF**
- [x] Deve ser possível cadastrar um novo carro.

**RN**
- [x] Somente um usuário administrador pode fazer o cadastro.
- [x] Não deve ser possível cadastrar um carro com placa já existente.
- [x] Não deve ser possível alterar a placa de um carro já cadastrado.
- [x] O carro deve ser cadastrado com disponibilidade para ser alugado.

## Listagem de carros

**RF**
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- [x] O usuário não precisa estar logado no sistema.

## Cadastro de especificação no carro

**RF**
- [x] Deve ser possível cadastrar uma especificação para um carro.

**RN**
- [x] Somente usuário administrador pode fazer o cadastro.
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [x] Não deve ser possível cadastrar uma especificação para um carro não existente.

## Cadastro de imagens do carro

**RF**
- [x] Deve ser possível cadastrar a imagem do carro.

**RNF**
- [x] Utilizar o multer para o upload.

**RN**
- [x] Somente usuário administrador pode fazer o cadastro da imagem.
- [x] Deve ser possível cadastrar mais de uma imagem para o mesmo carro.
- [x] Não deve ser possível adicionar imagem a um carro não existente.

## Aluguel de carro

**RF**
- [x] Deve ser possível cadastrar um aluguel.

**RN**
- [x] O aluguel deve ter duração miníma de 24 horas.
- [x] Não deve ser possível cadastrar um aluguel caso já exista para o mesmo carro.
- [x] Não deve ser possível cadastrar um aluguel caso já exista para o mesmo usuário.
- [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

## Devolução de carro

**RF**
- [x] Deve ser possível realizar a devolução de um carro alugado.

**RN**
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao esperado, deve ser cobrado multa proporcional aos dias de atraso.
- [x] Caso haja multa, deverá ser somado ao total do aluguel.

## Listagem de Alugueis para Usuário

**RF**
- [x] Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
- [x] O usuário deve estar logado na aplicação

## Recuperar senha

**RF**
- [] Deve ser possível o usuário recuperar a senha informando o email.
- [] O usuário deve receber um email com o passo a passo para a recuperação da senha.
- [] O usuário deve conseguir inserir uma nova senha.

**RN**
- [] O usuário precisa informar uma nova senha.
- [] O link enviado para a recuperação deve expirar em 3 horas.
