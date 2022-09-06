import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  // 项目的英文名字（或者说仓库名字
  name: string;
  @Column()
  // 项目的中文名字（正式名字
  title: string;
  @Column()
  intro: string;
  @Column()
  // 封面图片
  coverUrl: string;
  @Column()
  // 目录结构
  tree: string;
  @Column()
  // 仓库地址
  repositoryUrl: string;
  @Column()
  //项目部署地址
  displayUrl: string;
  @Column()
  // 项目使用的包
  package: string;
  @Column()
  // 项目用到的技术
  skills: string;
}
