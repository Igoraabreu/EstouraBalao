var timerId = null; //variável que armazena a chamada da função timeout

function iniciaJogo(){
	var url = window.location.search; //o window location pega a url inteira, o search pega o que vem depois do ?

	var nivel_jogo = url.replace("?","");
	//o método replace(), que permite substituir uma sequência de caracteres por outra.
	
	var tempo_segundos = 0;

	if (nivel_jogo == 1) //1 facil = 120segundos
	{
		tempo_segundos = 120;
	}

	if (nivel_jogo == 2) //2 normal = 60segundos
	{
		tempo_segundos = 60;
	}

	if (nivel_jogo == 3) //3 dificil = 30segundos
	{
		tempo_segundos = 30;
	}

	//inserir segundos no <span id="cronometro"
	//o innerHTML coloca um conteúdo em um elemento Html
	document.getElementById("cronometro").innerHTML = tempo_segundos + "s";

	// quantidade de balões
	var qtde_baloes = 50;

	cria_baloes(qtde_baloes);

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	//o inner vai inserir o conteudo(qtde_baloes) no elemento do id referenciado(baloes_inteiros)
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if (segundos == -1){
		clearTimeout(timerId); //para a execução da função setTimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	
	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
	//o metodo setTimeout() chama uma função ou avalia uma expressão depois de um número de milisegundos especifico
}

function game_over(){
	remove_eventos_baloes();
	alert("Fim de jogo, você não conseguiu estourar todos os balões a tempo");
}

function remove_eventos_baloes() {
    var i = 0; //contado para recuperar balões por id
    
    //percorre o elementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function cria_baloes(qtde_baloes){

	for (var i = 0; i < qtde_baloes; i++) {
		
		var balao = document.createElement("img");
		//A função createElement() irá criar um elemento HTML, é passado no parametro o "elemento" que a variável vai "ser"
		balao.src = "imagens/balao_azul_pequeno.png";
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		//o .id cria um id para o elemento
		balao.onclick = function(){ estourar(this); }
		//o onclick chama a função estourar, o this se refere ao proprio elemento. Então ele sera passado como parametro

		document.getElementById('cenario').appendChild(balao);
		/*A função appendChild() insere um elemento filho (children) ao elemento pai (parent) na última posição, 
		ela auxilia na criação de um elemento DOM;
		Nesse caso o o elemento balao, vai ser o filho do elemento div com a id cenario.
		*/
	}
}

function estourar(balloon){

	var id_balao = balloon.id;

	document.getElementById(id_balao).setAttribute("onclick", "");
	//o metodo setAttribute() adiciona um atributo especifico para um elemento, dar um valor especifico
	//no caso como o onclick já estava adicionado, só o valor vai ser colocado.

	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	//o .src vai retornar o endereço da imagem

	pontuacao(-1);
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	//aqui o innerHTML recupera o conteudo da Tag
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	//na função estourar a pontuação tem como parametro -1, entao baloes_inteiros vai receber ele mesmo +(-1), o que vai virar uma subtração
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
	if (baloes_inteiros == 0)
	{
		alert("Parabéns, você conseguiu todos os balões a tempo");
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function voltar_paginicial(){
	
	window.location.href = 'index.html';
}