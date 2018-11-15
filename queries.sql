carrega os dados

SELECT titulo, mensagem
    FROM sigfacil.s_mensaagem_aviso
    WHERE uf=$UF
    AND is_ativo = true


sem histórico

UPDATE s_mensagem_aviso 
    SET (ds_titulo, ds_mensagem) = ('titulo', 'mensagem')
    WHERE uf=$UF;


Com histórico

UPDATE s_mensaagem_aviso 
    SET is_ativo = false
    WHERE uf=$UF
    AND is_ativo = true

INSERT INTO sigfacil.s_mensagem_aviso (nu_seq_uf, ds_titulo, ds_mensagem)
    VALUES ('uf', 'titulo', 'corpo');


Lista de Ufs integrados

SELECT nu_seq_uf, ds_nome, ds_sigla
    FROM comum.s_uf
    WHERE is_integrado_sigfacil = true;

usuario (login)

SELECT p.ds_nome, u.nu_seq_usuario, u.ds_cargo, u.ds_login, u.dt_ultimo_acesso
    FROM autenticacao.s_usuario AS u
    INNER JOIN comum.s_pessoa_fisica AS pf ON pf.nu_seq_pessoa = u.nu_seq_pessoa_fisica
    INNER JOIN comum.s_pessoa AS p ON pf.nu_seq_pessoa = p.nu_seq_pessoa
    WHERE u.is_ativo = true AND u.ds_cargo = $1, AND u.ds_senha = $2 AND u.ds_login = $3