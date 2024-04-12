//För headern i api, kan kolla om status är success eller ta fram error-msg
export interface ApiHeaders {
    status: string;
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
  }