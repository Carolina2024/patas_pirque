import { Pets } from '../pets.entity';

export interface PaginatedResponse {
    items: Pets[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}