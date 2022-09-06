import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // 新建项目
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    console.log('创建成功');
    return this.projectService.create(createProjectDto);
  }

  // 分页查询 简略信息
  @Get('list')
  findPage(@Query() query) {
    const { page, limit } = query;
    return this.projectService.findListByPage(page, limit);
  }
  @Get('listcount')
  listcount() {
    return this.projectService.listcount();
  }
  // 通过id查询单个详细信息
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log('查询单个，id为' + id);
    return this.projectService.findOne(id);
  }
  // 新增
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }
  // 删除
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
