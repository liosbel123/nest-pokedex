import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async execute() {
    await this.pokemonModel.deleteMany(); //Elimina todos los registros
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemonToInsert: CreatePokemonDto[] = [];
    data.results.forEach(async ({ name, url }) => {
      const segmentos = url.split('/');
      const no: number = +segmentos[segmentos.length - 2];
      try {
        const pokemonDto: CreatePokemonDto = {
          no: no,
          name: name,
        };
        pokemonToInsert.push(pokemonDto);
      } catch (error) {
        console.log(error);
      }
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    return `Seed executed`;
  }
}
