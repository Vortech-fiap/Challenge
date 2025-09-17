#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>

#define DHTPIN 4       // Pino digital do sensor DHT22
#define DHTTYPE DHT22  // Tipo de sensor: DHT22

DHT dht(DHTPIN, DHTTYPE);

// LCD I2C 20x4
// Agora SDA=21 e SCL=22 (padrão ESP32)
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Sensores analógicos / digitais
const int SENSOR_CHUVA_PIN = 33;
const int SENSOR_VENTO_PIN = 32;
const int SENSOR_PRESSAO_PIN = 34;
const int LED1 = 25;
const int LED2 = 26;

// Intervalos
const unsigned long INTERVALO_LEITURA = 2000;
const unsigned long TEMPO_TELA = 3000;

unsigned long tempoUltimaLeitura = 0;
unsigned long tempoUltimaTrocaTela = 0;
bool mostrarAlertas = true;

// --- Caracteres customizados ---
byte corner_tl[8] = { B00111, B01111, B11110, B11101, B11110, B10010, B00001, B00000 };
byte top_mid[8]   = { B01110, B11111, B11111, B00000, B00000, B00000, B01110, B11111 };
byte corner_tr[8] = { B11100, B11110, B11111, B01111, B01111, B00111, B01000, B10000 };
byte mid_side_l[8]= { B10000, B10000, B10000, B10000, B11000, B10010, B10001, B10000 };
byte mid_side_r[8]= { B00001, B00001, B00001, B00011, B00101, B10001, B00001, B00001 };
byte corner_bl[8] = { B00000, B00001, B10010, B11100, B11100, B11110, B11111, B01111 };
byte bottom_mid[8]= { B00000, B00000, B10001, B01010, B01010, B11111, B11111, B01110 };
byte corner_br[8] = { B10000, B01011, B00111, B01111, B11111, B11111, B11110, B11100 };

void setup() {
  Serial.begin(9600);
  
  // Inicializa LCD nos pinos padrão (SDA=21, SCL=22)
  lcd.init();
  lcd.backlight();
  
  // Cria os caracteres customizados
  lcd.createChar(0, corner_tl);
  lcd.createChar(1, top_mid);
  lcd.createChar(2, corner_tr);
  lcd.createChar(3, mid_side_l);
  lcd.createChar(4, mid_side_r);
  lcd.createChar(5, corner_bl);
  lcd.createChar(6, bottom_mid);
  lcd.createChar(7, corner_br);

  lcd.setCursor(0,0);
  lcd.print("Inicializando...");
  delay(1500);

  // Configura sensores e LEDs
  pinMode(SENSOR_CHUVA_PIN, INPUT);
  pinMode(SENSOR_VENTO_PIN, INPUT);
  pinMode(SENSOR_PRESSAO_PIN, INPUT);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);

  dht.begin();
}

void loop() {
  unsigned long tempoAtual = millis();

  // Alterna tela
  if (tempoAtual - tempoUltimaTrocaTela >= TEMPO_TELA) {
    mostrarAlertas = !mostrarAlertas;
    tempoUltimaTrocaTela = tempoAtual;
    lcd.clear();
  }

  if (tempoAtual - tempoUltimaLeitura >= INTERVALO_LEITURA) {
    tempoUltimaLeitura = tempoAtual;

    // Leitura sensores
    int chuvaValor = analogRead(SENSOR_CHUVA_PIN);
    bool estaChovendo = (chuvaValor < 500);

    int ventoValor = analogRead(SENSOR_VENTO_PIN);
    float velocidadeVento = ventoValor * 100.0 / 1023.0;

    int pressaoValor = analogRead(SENSOR_PRESSAO_PIN);

    float temperatura = dht.readTemperature();
    float umidade = dht.readHumidity();

    // Condição do campo
    String condicaoCampo = estaChovendo ? "Molhado" : "Bom";

    // Debug serial
    Serial.println("-----");
    Serial.print("Temp: "); Serial.println(temperatura);
    Serial.print("Umid: "); Serial.println(umidade);
    Serial.print("Vento: "); Serial.println(velocidadeVento);
    Serial.print("Chuva: "); Serial.println(estaChovendo ? "Sim" : "Nao");
    Serial.print("Condicao do campo: "); Serial.println(condicaoCampo);

    // --- LCD ---
    if (mostrarAlertas) {
      lcd.setCursor(0,0);
      lcd.print("Campo: ");
      lcd.print(condicaoCampo);
      
      if (condicaoCampo == "Bom") {
        // Aparece uma bola de futebol
        lcd.setCursor(8,1);
        lcd.write(byte(0)); lcd.write(byte(1)); lcd.write(byte(2));
        
        lcd.setCursor(8,2);
        lcd.write(byte(3)); lcd.write(byte(6)); lcd.write(byte(4));
        
        lcd.setCursor(8,3);
        lcd.write(byte(5)); lcd.write(byte(6)); lcd.write(byte(7));
      } else {
        // Aparece uma bola de futebol
        lcd.setCursor(7,1);
        lcd.write(byte(1)); lcd.write(byte(1)); lcd.write(byte(1));
        lcd.setCursor(7,2);
        lcd.write(byte(3)); lcd.write(byte(3)); lcd.write(byte(3));
        lcd.setCursor(7,3);
        lcd.write(byte(3)); lcd.write(byte(3)); lcd.write(byte(3));
      }

    } else {
      lcd.setCursor(0,0);
      lcd.print("Temp: "); lcd.print(temperatura,1); lcd.print(" C");
      lcd.setCursor(0,1);
      lcd.print("Umid: "); lcd.print(umidade,1); lcd.print(" %");
      lcd.setCursor(0,2);
      lcd.print("Vento: "); lcd.print(velocidadeVento,1); lcd.print(" km/h");
      lcd.setCursor(0,3);
      lcd.print("Chuva: "); lcd.print(estaChovendo ? "Sim" : "Nao");
    }
  }
}
