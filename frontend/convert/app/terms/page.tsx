export default function TermsPage() {
  return (
    <div className="page-container page-container-narrow">
      <div className="animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="gradient-text">Termos de Servico</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          Ultima atualizacao: {new Date().toLocaleDateString("pt-PT")}
        </p>
      </div>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed animate-fadeInUp" style={{ animationDelay: "100ms" }}>
        {/* Aceitacao */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Aceitacao dos Termos</h2>
          <p>
            Ao aceder e utilizar o Conversor, aceita ficar vinculado a estes Termos de Servico.
            Se nao concordar com alguma parte destes termos, nao devera utilizar o nosso servico.
            A utilizacao continuada do site constitui a aceitacao de quaisquer alteracoes a estes termos.
          </p>
        </section>

        {/* Descricao do Servico */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Descricao do Servico</h2>
          <p>
            O Conversor e uma plataforma online gratuita que oferece ferramentas de conversao de ficheiros,
            incluindo mas nao limitado a: conversao de imagens para PDF, conversao entre formatos de documento,
            redimensionamento de imagens, conversao de formatos de imagem, criacao de icones e remocao de fundos.
          </p>
        </section>

        {/* Uso Aceitavel */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Uso Aceitavel</h2>
          <p className="mb-2">Ao utilizar o nosso servico, concorda em:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Nao utilizar o servico para fins ilegais ou nao autorizados</li>
            <li>Nao enviar ficheiros que contenham virus, malware ou conteudo malicioso</li>
            <li>Nao tentar aceder a areas restritas do sistema</li>
            <li>Nao sobrecarregar os nossos servidores com pedidos excessivos</li>
            <li>Nao utilizar o servico para converter conteudo protegido por direitos de autor sem autorizacao</li>
            <li>Respeitar os direitos de propriedade intelectual de terceiros</li>
          </ul>
        </section>

        {/* Limitacao de Responsabilidade */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Limitacao de Responsabilidade</h2>
          <p className="mb-2">
            O servico e fornecido &quot;tal como esta&quot; e &quot;conforme disponivel&quot;, sem garantias de qualquer tipo,
            expressas ou implicitas. Nao garantimos que:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>O servico sera ininterrupto ou isento de erros</li>
            <li>Os resultados das conversoes serao sempre perfeitos</li>
            <li>O servico sera compativel com todos os formatos de ficheiro</li>
          </ul>
          <p className="mt-2">
            Em nenhuma circunstancia seremos responsaveis por quaisquer danos diretos, indiretos, incidentais
            ou consequentes resultantes da utilizacao ou incapacidade de utilizacao do servico.
          </p>
        </section>

        {/* Ficheiros */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Ficheiros e Privacidade</h2>
          <p>
            Os ficheiros enviados para conversao sao{" "}
            <strong className="text-[var(--text-primary)]">eliminados automaticamente</strong> dos nossos
            servidores apos o processo de conversao estar concluido. Nao armazenamos, analisamos ou
            partilhamos o conteudo dos seus ficheiros. O utilizador e o unico responsavel pelo conteudo
            dos ficheiros que envia para conversao.
          </p>
        </section>

        {/* Propriedade Intelectual */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Propriedade Intelectual</h2>
          <p>
            Todo o conteudo do site, incluindo mas nao limitado a logotipos, design, textos e codigo,
            e propriedade do Conversor e esta protegido pelas leis de propriedade intelectual.
            Nao e permitida a reproducao, distribuicao ou modificacao sem autorizacao previa.
          </p>
        </section>

        {/* Alteracoes aos Termos */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Alteracoes aos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes Termos de Servico a qualquer momento.
            As alteracoes entram em vigor imediatamente apos a publicacao nesta pagina.
            A continuacao da utilizacao do servico apos as alteracoes constitui a aceitacao dos novos termos.
            Recomendamos que consulte esta pagina periodicamente.
          </p>
        </section>
      </div>
    </div>
  )
}
