import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  async execute() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1',
    );
    data.results.forEach(({ name, url }) => {
      const segmentos = url.split('/');
      const no: number = +segmentos[segmentos.length - 2];
      console.log(no);
    });
    return data;
  }
}