import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../../adaptInterface/Persistence/Repositories/AssinaturaORM.repository';
import { IAssinaturaModelRepository } from '../repositories/AssinaturaModel.repository';


@Injectable()

@Dependencies(AssinaturaRepositoryORM)
export class ServicoAssinaturasValidas {
  constructor(assinaturaRepository) {
    validate(assinaturaRepository, IAssinaturaModelRepository);
    this.assinaturaRepository = assinaturaRepository;
  }

  async assinaturaAtiva(codigo) {
    return await this.assinaturaRepository.porCodigo(codigo);
  }


  async syncAss(ass) {
    return await this.assinaturaRepository.cadastrar(ass)
  }
}