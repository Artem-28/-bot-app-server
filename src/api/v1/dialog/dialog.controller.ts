import { Body, Controller, Param, Post } from '@nestjs/common';
import { DialogService } from '@/modules/dialog/dialog.service';
import { StartDto } from '@/api/v1/dialog/dto';

@Controller('api/v1/projects/:projectId/dialogs')
export class DialogController {
  constructor(
    private readonly _dialogService: DialogService,
  ) {}

  @Post('start')
  public async start(@Param() param, @Body() dto: StartDto) {
    return await this._dialogService.start(dto);
  }
}
