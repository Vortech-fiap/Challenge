# Lista de posições das jogadoras
tipos_jogadoras = [
    "Atacante",
    "Meio-campo",
    "Zagueira",
    "Goleira",
    "Lateral-direita",
    "Lateral-esquerda"
]

# Lista de usuários do sistema
# Temos jogadoras e administradoras
# Podemos inscrever mais usuários no sistema na opção 2 do menu
usuarios = [
    {"nome": "Ana", "email": "ana@passabola.com", "senha": "12345",
     "tipo": tipos_jogadoras[0], "tipo_user": "jogadora",
     "inscricoes": [1]},  

    {"nome": "Bia", "email": "bia@passabola.com", "senha": "senhaBia",
     "tipo": tipos_jogadoras[1], "tipo_user": "jogadora",
     "inscricoes": [2, 3]}, 

    {"nome": "Carol", "email": "carol@passabola.com", "senha": "carol123",
     "tipo": tipos_jogadoras[2], "tipo_user": "jogadora",
     "inscricoes": []},
     # Administradoras não têm posição
    {"nome": "Admin1", "email": "admin1@passabola.com", "senha": "admin123",
     "tipo": None, "tipo_user": "admin"},
    {"nome": "Admin2", "email": "admin2@passabola.com", "senha": "admin456",
     "tipo": None, "tipo_user": "admin"}
]

# Lista de peneiras disponíveis no sistema
# Podemos inserir novas peneiras no menu Admin na opção 3
peneiras = [
    {"id": 1, "nome": "Peneira Sub-17", "local": "São Paulo", "data": "20/09/2025"},
    {"id": 2, "nome": "Peneira Feminina Sub-20", "local": "Rio de Janeiro", "data": "10/10/2025"},
    {"id": 3, "nome": "Peneira Aberta", "local": "Belo Horizonte", "data": "15/11/2025"}
]

# Aqui fizemod o nosso logo em ASCII para dar nossa cara ao projeto <3
def logo_liga_das_campeas():
    logo = r"""                             
                                  @@@                                 
                        @@@@@      #      @@@@@                       
                      @  ,@@@      @     .@@@   @.                    
              /@@@@*     @        @@@        @     ,@@@@              
            %@  @@@#                               #@@@  @,           
             @ ,%       @@@,  @@@     @@@@   (        *  @            
            @  @@   @@ @@     @@@@    @@ @@  @ @  @@ @@   @           
            @  @@   @@ @@ @@ @@@@@    @@ @@ @@ @@  @@@    @           
            @  @@@@ @@ @@@@@ @@  %%   %%@@ /@  @@ @@@@@   @           
         @@@            @@   @@@ @@@@@  @@@@@             @@@         
        @ @@@@@   @@@   @@@ @@@% @@  @@ @@     @@@@  @@@@@@   @       
       @  @@     @@ @@  @*@@@ @% @@@@@@ @@    (@ @@   @@@     @       
       @  @@  @  @@@@@  @* @  @% @@     @@@@@ @@@@@@ @(  @@&  @       
       @  @@@@@ @&                                    @@@@@   @       
        @@       %         @  @  @@@@@@     @.  &    &       @#       
              @  @        @ @@@@@@    @@@@  @@@      @  @             
              @  @&           @@       @@@@@  @     @@  @             
                @   @     @   @@@@@ @@@@@    @   *@   @               
                  @@   @     @ @@@@&@@@@@      @   @@                 
                     @@   @    @@    .@@    @   @@                    
                        @@   @          .@   @@                       
                           @@   @@   @@   @@                          
                              &@   @   @#                             
                                  @@@                                 
                                                                                                                                                                                                                                                                             
    """
    print(logo)
# Print da bola em ASCII que é só exibido no perfil da jogadora
def print_bola():
    bola = r"""                                                                     
          @@#@@@@@@@@         
       @       @    @  @      
     @@@,    .@       (  @    
    *     @@@@@@      @@@&    
    @     @@@@@      @@@@@@   
    ,@@@      @       #  @    
     @@@@       @   @    @    
       @#   @@@@@@@@@  @      
          @@*   @ *@@                                                                                                                                                                                                                                                               
    """
    print(bola)

# Função que mostra o menu principal para o usuário
def mostrar_menu_principal():
    logo_liga_das_campeas()
    print("\n==============================")
    print("      Plataforma Passa a Bola")
    print("==============================")
    print("1 - Login")
    print("2 - Registrar jogadora")
    print("==============================")

     # Pede a opção do usuário
    escolha = input("Selecione uma opção: ")
    return escolha


# Processa a escolha do menu principal
def processar_menu_principal():
    escolha = mostrar_menu_principal()
    
    if escolha == "1":
        # Vai para a tela de login
        login()  
    elif escolha == "2":
        # Chama registro de nova jogadora
        registrar_jogadora()
        # Volta pro menu principal depois
        processar_menu_principal()
    else:
        # Caso o usuário digite errado
        print("Opção inválida. Tente novamente.")
        # Mostra o menu de novo
        processar_menu_principal()

# Função de login
def login():
    email = input("Digite seu e-mail: ")
    senha = input("Digite sua senha: ")

    # Percorre a lista de usuários para conferir login
    for usuario in usuarios:
        if usuario["email"] == email and usuario["senha"] == senha:
            print(f"\nLogin realizado com sucesso! Bem-vindo(a), {usuario['nome']}\n")
            if usuario["tipo_user"] == "jogadora":
                # Vai para menu de jogadora
                menu_jogadora(usuario)
            elif usuario["tipo_user"] == "admin":
                # Vai para menu de admin
                menu_admin(usuario)
            return  
        
    # Volta para o menu se login errado e retorna mensagem de erro
    print("\nUsuário ou senha inválidos!\n")
    processar_menu_principal()


# Função de registro de jogadora
def registrar_jogadora():
    print("\n=== Registro de Jogadora ===")
    email = input("Digite seu e-mail: ")
    
    # Verifica se já existe usuário com esse email
    for u in usuarios:
        if u["email"] == email:
            print("\n E-mail já cadastrado. Tente outro.\n")
            # Sai se já existir
            return

    senha = input("Digite sua senha: ")

    print("\nEscolha o tipo jogadora:")
    i = 1
    # Mostra as posições com numeração
    for tipo in tipos_jogadoras:
        print(f"{i} - {tipo}")
        i += 1

    escolha = input("Digite o número correspondente ao tipo: ")

    if escolha.isdigit():
        escolha = int(escolha)
        if 1 <= escolha <= len(tipos_jogadoras):
            tipo_escolhido = tipos_jogadoras[escolha - 1]
            usuarios.append({
                "email": email,
                "senha": senha,
                "tipo": tipo_escolhido,
                "tipo_user": "jogadora"
            })
            print(f"\n Jogadora {email} cadastrada com sucesso como {tipo_escolhido}!\n")
        else:
            print("Número inválido.")
    else:
        print("Entrada inválida. Digite um número.")

# Menu da jogadora
def menu_jogadora(usuario):
    opcao = ""
    # Enquanto não fizer logout
    while opcao != "4":
        print_bola()
        print(f"\n=== Bem-vinda, {usuario['nome']}! ===")
        print("1 - Inscrever-se em peneira")
        print("2 - Ver minhas inscrições")
        print("3 - Logout")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            # Inscrição em peneira
            inscrever_peneira(usuario)
        elif opcao == "2":
            # Mostra inscrições
            ver_inscricoes(usuario)
        elif opcao == "3":
            print(f"\nLogout realizado para {usuario['nome']}.\n")
            # Volta para menu principal
            processar_menu_principal()
        else:
            print("Opção inválida! Tente novamente.")

# Inscrever jogadora em peneira
def inscrever_peneira(usuario):
    print("\n=== Peneiras Disponíveis ===")
    i = 1
    for p in peneiras:
        print(f"{i} - {p['nome']} ({p['local']} - {p['data']})")
        i += 1

    escolha = input("Digite o número da peneira para se inscrever: ")

    if escolha.isdigit():
        escolha = int(escolha)
        if 1 <= escolha <= len(peneiras):
            peneira_escolhida = peneiras[escolha - 1]
            pid = peneira_escolhida["id"]
            
            # Garante que a chave 'inscricoes' existe
            usuario.setdefault("inscricoes", [])

            if pid not in usuario["inscricoes"]:
                # Adiciona a inscrição
                usuario["inscricoes"].append(pid)
                print(f"\nInscrição realizada na {peneira_escolhida['nome']}!\n")
            else:
                print(f"\nVocê já está inscrita na {peneira_escolhida['nome']}.\n")
        else:
            print(" Número inválido.")
    else:
        print(" Entrada inválida. Digite um número.")


# Mostrar inscrições da jogadora
def ver_inscricoes(usuario):
    print("\n=== Minhas Inscrições ===")
    # Pega lista de ids de peneiras
    inscricoes = usuario.get("inscricoes", [])
    if not inscricoes:
        print("Você ainda não tem inscrições.")
    else:
        i = 1
        # Mostra todas as peneiras em que está inscrita
        for pid in inscricoes:
            peneira = next((p for p in peneiras if p["id"] == pid), None)
            if peneira:
                print(f"{i} - {peneira['nome']} ({peneira['local']} - {peneira['data']})")
                i += 1



def ver_inscricoes(usuario):
    print("\n=== Minhas Inscrições ===")
    # Pega a lista de IDs das peneiras que o usuário está inscrito
    # Se não tiver nenhuma inscrição, retorna uma lista vazia
    minhas_inscricoes_ids = usuario.get("inscricoes", [])  
    
    # Verifica se a lista está vazia
    if not minhas_inscricoes_ids:
        print("Você ainda não se inscreveu em nenhuma peneira.")
    # Se tiver inscrições, percorre cada ID de peneira
    else:
        for pid in minhas_inscricoes_ids:
            peneira = None
            # Busca a peneira correspondente pelo ID na lista de peneiras
            for p in peneiras:
                if p["id"] == pid:
                    peneira = p
                    # Para o loop quando encontrar a peneira
                    break
            # Se encontrou a peneira, mostra nome, data e local
            if peneira:
                print(f"- {peneira['nome']} | {peneira['data']} | {peneira['local']}")

# Menu de administradora
def menu_admin(usuario):
    print("\n==============================")
    print(f"Bem-vinda, {usuario['nome']} (Administradora)")
    print("==============================")
    print("1 - Ver lista de jogadoras")
    print("2 - Ver eventos e inscrições")
    print("3 - Adicionar evento")
    print("4 - Logout")
    print("==============================")
    
    escolha = input("Selecione uma opção: ")

    if escolha == "1":
        # Mostra todas as jogadoras e admins
        ver_usuarios()
        # Volta para o menu depois
        menu_admin(usuario)
    elif escolha == "2":
        # Mostra peneiras e inscritas
        ver_eventos_e_inscricoes()
        # Volta para o menu depois
        menu_admin(usuario)
    elif escolha == "3":
         # Adiciona uma nova peneira
        adicionar_evento()
        # Volta para o menu depois
        menu_admin(usuario)
    elif escolha == "4":
        print(f"\nLogout realizado para {usuario['nome']}\n")
        # Volta pro menu principal depois do logout
        processar_menu_principal()
    else:
         # Caso escolha errado
        print("Opção inválida! Tente novamente.")
        menu_admin(usuario)
    processar_menu_principal()


# Função que mostra todas as jogadoras e admins
def ver_usuarios():
    print("\n=== Lista de Usuários ===")
    for u in usuarios:
        # Se for jogadora
        if u["tipo_user"] == "jogadora":
            print(f"- Nome: {u['nome']}, Email: {u['email']}, Tipo: {u['tipo_user']}, Posição: {u['tipo']}")
        # Se for admin
        else:
            print(f"- Nome: {u['nome']}, Email: {u['email']}, Tipo: {u['tipo_user']}")
    print("=========================\n")


# Função que mostra os eventos (peneiras) e as inscritas
def ver_eventos_e_inscricoes():
    print("\n=== Eventos e Inscrições ===\n")
    for peneira in peneiras:
        print(f"ID: {peneira['id']} | {peneira['nome']} | {peneira['local']} | {peneira['data']}")
        # Pega todas as jogadoras inscritas nessa peneira
        inscritas = [u["nome"] for u in usuarios if "inscricoes" in u and peneira["id"] in u["inscricoes"]]
        # Se tiver inscrita exibe
        if inscritas:
            print("Jogadoras inscritas:")
            for nome in inscritas:
                print(f" - {nome}")
        # Se não tiver inscrita mostra mensagem
        else:
            print("Nenhuma jogadora inscrita.")
        print("------------------------------")

# Função que adiciona uma nova peneira
def adicionar_evento():
    print("\n=== Adicionar Nova Peneira ===")
    nome = input("Digite o nome da peneira: ")
    local = input("Digite o local da peneira: ")
    data = input("Digite a data da peneira (dd/mm/aaaa): ")

    # Cria um novo id para a peneira (1 maior que o maior existente)
    novo_id = max([p["id"] for p in peneiras], default=0) + 1

    # Dicionário da nova peneira
    nova_peneira = {
        "id": novo_id,
        "nome": nome,
        "local": local,
        "data": data
    }
    # Adiciona na lista de peneiras
    peneiras.append(nova_peneira)
    print(f"\n Peneira '{nome}' adicionada com sucesso!\n")




def login():
    # Pede pro usuário digitar o e-mail
    email = input("Digite seu e-mail: ")
    # Pede pro usuário digitar a senha
    senha = input("Digite sua senha: ")

    # Percorre a lista de usuários para verificar se as credenciais existem
    for usuario in usuarios:
        # Verifica se o e-mail e senha batem com algum usuário
        if usuario["email"] == email and usuario["senha"] == senha:
            # Se encontrou, mostra mensagem de sucesso com o nome da pessoa
            print(f"\nLogin realizado com sucesso! Bem-vindo(a), {usuario['nome']}\n")
            # Se for jogadora, chama o menu da jogadora
            if usuario["tipo_user"] == "jogadora":
                menu_jogadora(usuario)
            # Se for admin, chama o menu da administradora
            elif usuario["tipo_user"] == "admin":
                menu_admin(usuario)
            # Para a função aqui porque já encontrou o usuário
            return
    # Se chegou até aqui, nenhum usuário bateu com o e-mail e senha digitados
    print("\n Usuário ou senha inválidos!\n")


def registrar_jogadora():
    print("\n=== Registro de Jogadora ===")
    # Pede para a jogadora digitar o nome dela
    nome = input("Digite seu nome: ")
    # Pede para a jogadora digitar o e-mail dela
    email = input("Digite seu e-mail: ")
    
    # Verifica se o e-mail já existe na lista de usuários
    for u in usuarios:
        # Se o e-mail já estiver cadastrado, avisa a pessoa e retorna pra não continuar
        if u["email"] == email:
            print("\n E-mail já cadastrado. Tente outro.\n")
            return
    # Pede para a jogadora criar uma senha
    senha = input("Digite sua senha: ")

   # Mostra as opções de tipos disponíveis
    print("\nEscolha seu tipo de jogadora:")
    i = 1
    for tipo in tipos_jogadoras:
        # Mostra o número e o tipo, ex: 1 - Atacante
        print(f"{i} - {tipo}")
        i += 1
     # Pede para a jogadora escolher o número correspondente ao tipo dela
    escolha = input("Digite o número correspondente ao tipo: ")

    # Verifica se o que foi digitado é um número
    if escolha.isdigit():
        escolha = int(escolha)
        # Verifica se o número digitado é válido dentro dos tipos disponíveis
        if 1 <= escolha <= len(tipos_jogadoras):
            # Pega o tipo escolhido usando o índice
            tipo_escolhido = tipos_jogadoras[escolha - 1]
             # Adiciona a nova jogadora na lista de usuários
            usuarios.append({
                "nome": nome,
                "email": email,
                "senha": senha,
                "tipo": tipo_escolhido,
                "tipo_user": "jogadora"
            })
            # Mensagem de sucesso
            print(f"\nJogadora {nome} cadastrada com sucesso como {tipo_escolhido}!\n")
            # Volta para o menu principal
            mostrar_menu_principal()
        else:
            # Se digitou um número diferente dos tipos disponiveis
            print("Número inválido.")
    # Se digitou algo que não é número
    else:
        print("Entrada inválida. Digite um número.")



# Função principal que inicia o programa
def main():
    # Começa mostrando o menu principal
    processar_menu_principal()

# Chama a função principal para iniciar o programa
main()