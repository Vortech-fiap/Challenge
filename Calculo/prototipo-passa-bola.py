import tkinter as tk
from tkinter import messagebox
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
 
# Dados reais/históricos da Marta
jogos = np.array([1, 2, 3, 4, 5, 6])  # exemplo de últimos 6 jogos
gols_por_jogo = [1, 0, 2, 1, 3, 0]     # números fictícios para esses jogos
 
# Estatísticas fixas/gerais
gols_totais = 122
jogos_totais = 213
meta_gols_novo_jogo = 1.5  # meta fictícia: Marta deve marcar mais de 1.5 gols no próximo jogo
 
janela = tk.Tk()
janela.title("Desempenho de Marta – Seleção Brasileira")
 
fig, ax = plt.subplots(figsize=(6, 4))
canvas = FigureCanvasTkAgg(fig, master=janela)
canvas.get_tk_widget().pack()
 
def atualizar_grafico(novo_gol=None):
    ax.clear()
    jogos_plot = list(jogos)
    gols_plot = list(gols_por_jogo)
    if novo_gol is not None:
        jogos_plot.append(jogos_plot[-1] + 1)
        gols_plot.append(novo_gol)
    ax.bar(jogos_plot, gols_plot, color='blue', label="Gols por jogo")
    ax.axhline(y=meta_gols_novo_jogo, color='red', linestyle='--', label=f"Meta: {meta_gols_novo_jogo:.1f} gols")
    ax.set_title("Desempenho recente de Marta (últimos jogos + novo jogo)")
    ax.set_xlabel("Jogo número")
    ax.set_ylabel("Gols marcados")
    ax.set_xticks(jogos_plot)
    ax.grid(axis='y')
    ax.legend()
    canvas.draw_idle()
 
# Primeiro desenho
atualizar_grafico()
 
label_input = tk.Label(janela, text=f"Digite quantos gols Marta marcou no próximo jogo (meta = {meta_gols_novo_jogo}):")
label_input.pack(pady=5)
 
entry_gols = tk.Entry(janela)
entry_gols.pack()
 
def verificar_gols():
    valor_texto = entry_gols.get()
    try:
        valor = float(valor_texto.replace(',', '.'))
    except ValueError:
        messagebox.showerror("Erro", "Por favor, insira um número válido.")
        return
    if valor < 0 or valor > 10:
        messagebox.showerror("Erro", "Valor muito alto ou inválido. Digite entre 0 e 10.")
        return
    atualizar_grafico(novo_gol=valor)
    if valor > meta_gols_novo_jogo:
        messagebox.showinfo("Bom desempenho", "Marta superou a meta no novo jogo!")
    elif valor == meta_gols_novo_jogo:
        messagebox.showinfo("Meta atingida", "Marta atingiu exatamente a meta no novo jogo.")
    else:
        messagebox.showwarning("Desempenho abaixo", "Marta não atingiu a meta.")
 
botao = tk.Button(janela, text="Verificar novo jogo", command=verificar_gols, bg='#007acc', fg='white', font=('Arial', 12, 'bold'))
botao.pack(pady=10)
 
# Também mostrar estatísticas gerais em label
label_geral = tk.Label(janela, text=f"Estatísticas gerais: {gols_totais} gols em {jogos_totais} jogos pela Seleção.")
label_geral.pack(pady=5)
 
janela.mainloop()