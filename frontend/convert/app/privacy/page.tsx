export default function PrivacyPage() {
  return (
    <div className="page-container page-container-narrow">
      <div className="animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="gradient-text">Politica de Privacidade</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          Ultima atualizacao: {new Date().toLocaleDateString("pt-PT")}
        </p>
      </div>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed animate-fadeInUp" style={{ animationDelay: "100ms" }}>
        {/* Introducao */}
        <section>
          <p>
            A sua privacidade e importante para nos. Esta Politica de Privacidade explica como o Conversor recolhe,
            utiliza e protege as suas informacoes quando utiliza o nosso servico de conversao de ficheiros.
          </p>
        </section>

        {/* Dados Recolhidos */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Dados Recolhidos</h2>
          <p className="mb-2">Podemos recolher os seguintes tipos de informacao:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Informacoes de utilizacao do site (paginas visitadas, tempo de navegacao)</li>
            <li>Dados tecnicos (tipo de navegador, sistema operativo, endereco IP anonimizado)</li>
            <li>Ficheiros enviados para conversao (temporarios, ver seccao 4)</li>
            <li>Informacoes fornecidas voluntariamente atraves do formulario de contacto</li>
          </ul>
        </section>

        {/* Uso dos Dados */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Uso dos Dados</h2>
          <p className="mb-2">Os dados recolhidos sao utilizados para:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Fornecer e manter o servico de conversao de ficheiros</li>
            <li>Melhorar a experiencia do utilizador</li>
            <li>Analisar padroes de utilizacao para otimizar o desempenho do site</li>
            <li>Responder a pedidos de contacto e suporte</li>
          </ul>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Cookies</h2>
          <p className="mb-2">
            O nosso site utiliza cookies para melhorar a sua experiencia de navegacao. Os cookies sao pequenos
            ficheiros de texto armazenados no seu dispositivo. Utilizamos:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong className="text-[var(--text-primary)]">Cookies essenciais:</strong> necessarios para o funcionamento do site</li>
            <li><strong className="text-[var(--text-primary)]">Cookies de analise:</strong> para compreender como os utilizadores interagem com o site</li>
            <li><strong className="text-[var(--text-primary)]">Cookies de publicidade:</strong> utilizados pelos nossos parceiros de publicidade para exibir anuncios relevantes</li>
          </ul>
          <p className="mt-2">
            Pode gerir as suas preferencias de cookies atraves das definicoes do seu navegador.
          </p>
        </section>

        {/* Ficheiros Enviados */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Ficheiros Enviados</h2>
          <p>
            Os ficheiros que envia para conversao sao processados nos nossos servidores e{" "}
            <strong className="text-[var(--text-primary)]">apagados automaticamente apos a conversao</strong>.
            Nao armazenamos, partilhamos ou acedemos ao conteudo dos seus ficheiros. O processo de conversao
            e totalmente automatizado e nenhum ser humano tem acesso aos seus ficheiros durante o processo.
          </p>
        </section>

        {/* Servicos de Terceiros */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Servicos de Terceiros</h2>
          <p className="mb-2">Utilizamos os seguintes servicos de terceiros:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong className="text-[var(--text-primary)]">Google AdSense:</strong> para exibir anuncios. O Google pode utilizar cookies
              para apresentar anuncios com base nas suas visitas anteriores. Pode consultar a{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:underline">
                Politica de Privacidade do Google
              </a>.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Google Analytics:</strong> para analise de trafego e comportamento dos utilizadores.
              Os dados sao recolhidos de forma anonimizada.
            </li>
          </ul>
        </section>

        {/* Direitos do Utilizador */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Direitos do Utilizador</h2>
          <p className="mb-2">De acordo com o RGPD, tem direito a:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Aceder aos seus dados pessoais</li>
            <li>Retificar dados incorretos</li>
            <li>Solicitar a eliminacao dos seus dados</li>
            <li>Opor-se ao tratamento dos seus dados</li>
            <li>Portabilidade dos dados</li>
          </ul>
          <p className="mt-2">
            Para exercer qualquer um destes direitos, entre em contacto connosco atraves da{" "}
            <a href="/contact" className="text-[var(--accent-cyan)] hover:underline">pagina de contacto</a>.
          </p>
        </section>

        {/* Alteracoes */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Alteracoes a esta Politica</h2>
          <p>
            Reservamo-nos o direito de atualizar esta Politica de Privacidade a qualquer momento.
            Quaisquer alteracoes serao publicadas nesta pagina com a data de atualizacao revista.
            Recomendamos que consulte esta pagina periodicamente.
          </p>
        </section>
      </div>
    </div>
  )
}
