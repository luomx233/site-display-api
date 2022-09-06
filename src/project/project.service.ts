import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  // 创建新项目
  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    console.log(project);
    return this.projectRepository.save(project);
  }

  //查询分页列表
  async findListByPage(page, limit) {
    return await this.projectRepository.find({
      order: {
        id: 'ASC',
      },
      skip: page,
      take: limit,
      select: ['id', 'coverUrl', 'intro', 'title', 'repositoryUrl'],
    });
  }
  async listcount() {
    return this.projectRepository.count();
  }
  // 查询单个详情
  async findOne(id: number) {
    return await this.projectRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // 更新
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    this.projectRepository.update;
    const toupdate = await this.projectRepository.preload({
      id: id,
      ...updateProjectDto,
    });
    if (!toupdate) {
      throw new NotFoundException(`id为${id}的条目未找到！`);
    }
    await this.projectRepository.save(toupdate);
  }

  // 删除
  async remove(id: number) {
    const toupdate = await this.projectRepository.findOne({
      where: { id: id },
    });
    await this.projectRepository.remove(toupdate);
  }
}
