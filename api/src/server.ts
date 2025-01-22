import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { TeamRoute } from '@routes/team.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new AuthRoute(), new TeamRoute()]);

app.listen();
