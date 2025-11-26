import { HttpService } from "@nestjs/axios";
import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { User } from "src/database/user.entity";

@Injectable()
export class SendbirdService {
    private readonly sendbirdUrl = process.env.SENDBIRD_API_URL
    private readonly apiToken = process.env.SENDBIRD_MASTER_API_TOKEN

    constructor(private readonly http: HttpService) { }

    private headers() {
        return {
            'Api-Token': this.apiToken,
            'Content-Type': 'application/json; charset=utf8',
        }
    }

    async createUser(user: User): Promise<boolean> {
        const body = {
            user_id: user.id,
            nickname: user.name,
            profile_url: null
        }

        try {
            await firstValueFrom(
                this.http.post(`${this.sendbirdUrl}/users`, body, { headers: this.headers() })
            )

            return true;
        } catch (err) {
            throw new ServiceUnavailableException(err.response?.data)
        }
    }
}