class StateDTO {
    constructor(id, name, sigla, RegiaoDTO) {
        this.id = id;
        this.name = name;
        this.sigla = sigla;
        this.RegiaoDTO = RegiaoDTO;
    }
    static fromJSON(json) {
        return new StateDTO(
            json.id,
            json.nome,
            json.sigla,
            json.regiao ? new RegiaoDTO(json.regiao.id, json.regiao.sigla, json.regiao.nome) : null
        );
    }
}

class CityDTO {
    constructor(id, name, MicrorregiaoDTO) {
        this.id = id;
        this.name = name;
        this.MicrorregiaoDTO = MicrorregiaoDTO;
    }
    static fromJSON(json) {
        return new CityDTO(
            json.id,
            json.nome,
            json.microrregiao ? new MicrorregiaoDTO(json.microrregiao.id, json.microrregiao.nome, json.microrregiao.mesorregiao ? new MesorregiaoDTO(json.microrregiao.mesorregiao.id, json.microrregiao.mesorregiao.nome) : null) : null
        );
    }
}

class MicrorregiaoDTO {
    constructor(id, name, MesorregiaoDTO) {
        this.id = id;
        this.name = name;
        this.MesorregiaoDTO = MesorregiaoDTO;
    }
}

class MesorregiaoDTO {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class RegiaoDTO {
    constructor(id, sigla, name) {
        this.id = id;
        this.sigla = sigla;
        this.name = name;
    }
}
