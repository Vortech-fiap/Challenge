
tipos_jogadoras = [
    "Atacante",
    "Meio-campo",
    "Zagueira",
    "Goleira",
    "Lateral-direita",
    "Lateral-esquerda"
]


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
    {"nome": "Admin1", "email": "admin1@passabola.com", "senha": "admin123",
     "tipo": None, "tipo_user": "admin"},
    {"nome": "Admin2", "email": "admin2@passabola.com", "senha": "admin456",
     "tipo": None, "tipo_user": "admin"}
]

peneiras = [
    {"id": 1, "nome": "Peneira Sub-17", "local": "São Paulo", "data": "20/09/2025"},
    {"id": 2, "nome": "Peneira Feminina Sub-20", "local": "Rio de Janeiro", "data": "10/10/2025"},
    {"id": 3, "nome": "Peneira Aberta", "local": "Belo Horizonte", "data": "15/11/2025"}
]



def logoLigaDasCampeas():
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

def printBola():
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

def mostrarMenuPrincipal():
    logoLigaDasCampeas()
    print("\n==============================")
    print("      Plataforma Passa a Bola")
    print("==============================")
    print("1 - Login")
    print("2 - Registrar jogadora")
    print("==============================")
    
    escolha = input("Selecione uma opção: ")
    return escolha



def processarMenuPrincipal():
    escolha = mostrarMenuPrincipal()
    
    if escolha == "1":
        login()  
    elif escolha == "2":
        registrar_jogadora()
        processarMenuPrincipal()  
    else:
        print("Opção inválida. Tente novamente.")
        processarMenuPrincipal()  

def login():
    email = input("Digite seu e-mail: ")
    senha = input("Digite sua senha: ")

    for usuario in usuarios:
        if usuario["email"] == email and usuario["senha"] == senha:
            print(f"\nLogin realizado com sucesso! Bem-vindo(a), {usuario['nome']}\n")
            if usuario["tipo_user"] == "jogadora":
                menuJogadora(usuario)
            elif usuario["tipo_user"] == "admin":
                menuAdmin(usuario)
            return  

    print("\nUsuário ou senha inválidos!\n")
    processarMenuPrincipal()  



def registrar_jogadora():
    print("\n=== Registro de Jogadora ===")
    email = input("Digite seu e-mail: ")


    for u in usuarios:
        if u["email"] == email:
            print("\n E-mail já cadastrado. Tente outro.\n")
            return

    senha = input("Digite sua senha: ")

    print("\nEscolha seu tipo de jogadora:")
    i = 1
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


def menuJogadora(usuario):
    opcao = ""
    while opcao != "4":
        print(f"\n=== Bem-vinda, {usuario['nome']}! ===")
        print("1 - Inscrever-se em peneira")
        print("2 - Ver minhas inscrições")
        print("3 - Logout")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            inscrever_peneira(usuario)
        elif opcao == "2":
            ver_inscricoes(usuario)
        elif opcao == "3":
            print(f"\nLogout realizado para {usuario['nome']}.\n")
            processarMenuPrincipal()
        else:
            print("Opção inválida! Tente novamente.")


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

            usuario.setdefault("inscricoes", [])

            if pid not in usuario["inscricoes"]:
                usuario["inscricoes"].append(pid)
                print(f"\nInscrição realizada na {peneira_escolhida['nome']}!\n")
            else:
                print(f"\nVocê já está inscrita na {peneira_escolhida['nome']}.\n")
        else:
            print(" Número inválido.")
    else:
        print(" Entrada inválida. Digite um número.")



def ver_inscricoes(usuario):
    print("\n=== Minhas Inscrições ===")
    inscricoes = usuario.get("inscricoes", [])
    if not inscricoes:
        print("Você ainda não tem inscrições.")
    else:
        i = 1
        for pid in inscricoes:
            peneira = next((p for p in peneiras if p["id"] == pid), None)
            if peneira:
                print(f"{i} - {peneira['nome']} ({peneira['local']} - {peneira['data']})")
                i += 1



def ver_inscricoes(usuario):
    print("\n=== Minhas Inscrições ===")
    minhas_inscricoes_ids = usuario.get("inscricoes", [])  
    
    if not minhas_inscricoes_ids:
        print("Você ainda não se inscreveu em nenhuma peneira.")
    else:
        for pid in minhas_inscricoes_ids:
            peneira = None
            for p in peneiras:
                if p["id"] == pid:
                    peneira = p
                    break
            if peneira:
                print(f"- {peneira['nome']} | {peneira['data']} | {peneira['local']}")


def editar_perfil(usuario):
    print("\n=== Editar Perfil ===")
    novo_nome = input(f"Digite seu novo nome (atual: {usuario['nome']}): ")
    nova_senha = input("Digite sua nova senha (ou deixe vazio para manter): ")

    if novo_nome:
        usuario["nome"] = novo_nome
    if nova_senha:
        usuario["senha"] = nova_senha

    print("Perfil atualizado com sucesso!")


def menuAdmin(usuario):
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
        ver_usuarios()
        menuAdmin(usuario)
    elif escolha == "2":
        verEventosEInscricoes()
        menuAdmin(usuario)
    elif escolha == "3":
        adicionarEvento()
        menuAdmin(usuario)
    elif escolha == "4":
        print(f"\nLogout realizado para {usuario['nome']}\n")
    else:
        print("Opção inválida! Tente novamente.")
        menuAdmin(usuario)


def ver_usuarios():
    print("\n=== Lista de Usuários ===")
    for u in usuarios:
        if u["tipo_user"] == "jogadora":
            print(f"- Nome: {u['nome']}, Email: {u['email']}, Tipo: {u['tipo_user']}, Posição: {u['tipo']}")
        else:
            print(f"- Nome: {u['nome']}, Email: {u['email']}, Tipo: {u['tipo_user']}")
    print("=========================\n")



def verEventosEInscricoes():
    print("\n=== Eventos e Inscrições ===\n")
    for peneira in peneiras:
        print(f"ID: {peneira['id']} | {peneira['nome']} | {peneira['local']} | {peneira['data']}")
        inscritas = [u["nome"] for u in usuarios if "inscricoes" in u and peneira["id"] in u["inscricoes"]]
        if inscritas:
            print("Jogadoras inscritas:")
            for nome in inscritas:
                print(f" - {nome}")
        else:
            print("Nenhuma jogadora inscrita.")
        print("------------------------------")


def adicionarEvento():
    print("\n=== Adicionar Nova Peneira ===")
    nome = input("Digite o nome da peneira: ")
    local = input("Digite o local da peneira: ")
    data = input("Digite a data da peneira (dd/mm/aaaa): ")


    novo_id = max([p["id"] for p in peneiras], default=0) + 1

  
    nova_peneira = {
        "id": novo_id,
        "nome": nome,
        "local": local,
        "data": data
    }

    peneiras.append(nova_peneira)
    print(f"\n Peneira '{nome}' adicionada com sucesso!\n")




def login():
    email = input("Digite seu e-mail: ")
    senha = input("Digite sua senha: ")

    for usuario in usuarios:
        if usuario["email"] == email and usuario["senha"] == senha:
            print(f"\nLogin realizado com sucesso! Bem-vindo(a), {usuario['nome']}\n")
            if usuario["tipo_user"] == "jogadora":
                menuJogadora(usuario)
            elif usuario["tipo_user"] == "admin":
                menuAdmin(usuario)
            return

    print("\n Usuário ou senha inválidos!\n")


def registrar_jogadora():
    print("\n=== Registro de Jogadora ===")
    
    nome = input("Digite seu nome: ")
    email = input("Digite seu e-mail: ")


    for u in usuarios:
        if u["email"] == email:
            print("\n E-mail já cadastrado. Tente outro.\n")
            return

    senha = input("Digite sua senha: ")

   
    print("\nEscolha seu tipo de jogadora:")
    i = 1
    for tipo in tipos_jogadoras:
        print(f"{i} - {tipo}")
        i += 1

    escolha = input("Digite o número correspondente ao tipo: ")

    if escolha.isdigit():
        escolha = int(escolha)
        if 1 <= escolha <= len(tipos_jogadoras):
            tipo_escolhido = tipos_jogadoras[escolha - 1]
            usuarios.append({
                "nome": nome,
                "email": email,
                "senha": senha,
                "tipo": tipo_escolhido,
                "tipo_user": "jogadora"
            })
            print(f"\nJogadora {nome} cadastrada com sucesso como {tipo_escolhido}!\n")
            mostrarMenuPrincipal()
        else:
            print("Número inválido.")
    else:
        print("Entrada inválida. Digite um número.")




def main():
    processarMenuPrincipal()


main()