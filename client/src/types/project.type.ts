import {
  createProjectSchema,
  editProjectSchema,
} from '@/validators/project.validator';
import {
  BaseEntity,
  BaseResponse,
  BaseUser,
  PaginatedResponse,
  ZodInfer,
} from './common.type';

export type CreateProjectInput = ZodInfer<typeof createProjectSchema>;
export type EditProjectInput = ZodInfer<typeof editProjectSchema>;

export type Project = BaseEntity &
  CreateProjectInput & {
    workspace: string;
    createdBy: BaseUser;
  };

// Request Types
export interface CreateProjectRequest {
  workspaceId: string;
  data: CreateProjectInput;
}

export interface EditProjectRequest {
  workspaceId: string;
  projectId: string;
  data: EditProjectInput;
}

export interface AllProjectRequest {
  workspaceId: string;
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  skip?: boolean;
}

export interface ProjectByIdRequest {
  workspaceId: string;
  projectId: string;
}

// Response Types
export type CreateProjectResponse = BaseResponse & { project: Project };
export type EditProjectResponse = CreateProjectResponse;
export type DeleteProjectResponse = BaseResponse;
export type AllProjectResponse = PaginatedResponse<Project[], 'projects'>;
export type ProjectByIdResponse = CreateProjectResponse;
