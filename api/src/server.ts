import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { TeamRoute } from '@routes/team.route';
import { FactoryRoute } from './routes/factory.route';
import { ValidateEnv } from '@utils/validateEnv';
import { PlayerRoute } from './routes/player.route';
import { DraftRoute } from './routes/draft.route';

ValidateEnv();

const app = new App([new AuthRoute(), new TeamRoute(), new FactoryRoute(), new PlayerRoute(), new DraftRoute()]);

app.listen();
