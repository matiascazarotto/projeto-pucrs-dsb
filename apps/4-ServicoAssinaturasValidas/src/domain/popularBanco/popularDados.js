import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../adaptInterface/Controllers/app.module';
import { AssinaturaRepositoryORM } from '../../adaptInterface/Persistence/Repositories/AssinaturaORM.repository';



export async function droparTabelas() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const assinaturaRepository = app.get(AssinaturaRepositoryORM);

    await assinaturaRepository.dropTable();
    await app.close();
}



export async function popularDados() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const assinaturaRep = app.get(AssinaturaRepositoryORM);
    const dataAtual = new Date();
    const dataAtual2 = new Date();
    dataAtual2.setDate(dataAtual.getDate() +7);
    const dataRetroativa = new Date()
    const dataRetroativa2 = new Date();
    dataRetroativa.setDate(dataAtual.getDate() - 10);
    dataRetroativa2.setDate(dataAtual.getDate() - 3);
    await assinaturaRep.populaDB({codCli: 2, codApp: 1, inicioVigencia : new Date(dataAtual), fimVigencia: new Date(dataAtual2)});
    await assinaturaRep.populaDB({codCli: 4, codApp: 2, inicioVigencia : new Date(dataAtual), fimVigencia: new Date(dataAtual2)});
    await assinaturaRep.populaDB({codCli: 6, codApp: 3, inicioVigencia : new Date(dataRetroativa), fimVigencia: new Date(dataRetroativa2)});
    await assinaturaRep.populaDB({codCli: 8, codApp: 4, inicioVigencia : new Date(dataAtual), fimVigencia: new Date(dataAtual2)});
    await assinaturaRep.populaDB({codCli: 10, codApp: 5, inicioVigencia : new Date(dataRetroativa), fimVigencia: new Date(dataRetroativa2)});
    
    await app.close();
}