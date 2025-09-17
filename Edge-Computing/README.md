# Projeto IoT: "Passa a Bola"
 
<img width="524" height="1036" alt="sensor-passa-bola" src="https://github.com/user-attachments/assets/d40c4485-0dd6-4e59-94ff-bba3ade8c753" />

## Equipe 

* Luara Ramos - rm565573
* Jean Feltran - rm566534
* Kaio Galvão - rm566536

## Descrição do Projeto

Este projeto consiste na Sprint 3 do desafio "Passa a Bola", focado no desenvolvimento da arquitetura inicial de uma aplicação IoT. Nosso objetivo é criar uma solução capaz de monitorar em tempo real as condições climáticas de um campo de futebol, como temperatura, umidade, vento e chuva. Esses dados são essenciais para otimizar o uso do espaço, garantir a segurança dos usuários e auxiliar na gestão do local.

## Arquitetura Proposta

A arquitetura do projeto é dividida em três camadas principais:

* **Camada de Dispositivos:** O protótipo, apelidado de "Campo Inteligente", é a base da nossa solução. Ele é construído com um microcontrolador **ESP32** e sensores específicos para coletar dados ambientais.
* **Camada de Processamento / Middleware:** Utilizando o **Node-RED**, processamos os dados brutos e aplicamos a lógica de negócio. Essa camada também atua como um hub para a comunicação, preparando os dados para a aplicação final.
* **Camada de Aplicação:** Onde os dados processados são visualizados em um dashboard e geram alertas inteligentes para os gestores, permitindo a tomada de decisões em tempo real.


## Recursos Necessários

### Hardware

* **Microcontrolador:** ESP32
* **Sensores:**
    * Sensor de temperatura e umidade (DHT22)
    * Sensor de chuva
    * Sensor de vento
* **Componentes de exibição:** Display LCD I2C 20x4
* **Placa de desenvolvimento**

### Software

* **Arduino IDE:** Para programar o microcontrolador ESP32.
* **Bibliotecas Arduino:** `Wire.h`, `LiquidCrystal_I2C.h`, `DHT.h`
* **Node-RED:** Para a camada de processamento de dados.

## Instruções de Uso

### 1. Configuração do ESP32 na Arduino IDE

1.  Abra a Arduino IDE e vá em **`Arquivo > Preferências`**.
2.  No campo "URLs Adicionais para Gerenciadores de Placas", cole a URL: `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
3.  Vá em **`Ferramentas > Placa > Gerenciador de Placas...`**.
4.  Procure por `esp32` e clique em **Instalar**.

### 2. Upload do Código para o Dispositivo

1.  Abra o código-fonte (`.ino` ou equivalente) na Arduino IDE.
2.  Selecione a placa ESP32 correta em **`Ferramentas > Placa`**.
3.  Conecte o ESP32 ao computador via USB.
4.  Clique no botão "Upload" na Arduino IDE.

### 3. Execução

1.  Após o upload, o ESP32 iniciará a leitura dos sensores e exibirá os dados no display LCD.

2.  As condições do campo (Bom ou Molhado) serão indicadas por ícones específicos: uma **bola de futebol** para boas condições ou um desenho de **chuva** para condições desfavoráveis.

