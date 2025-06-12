import {
  Controller,
  Post as HttpPost,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from './schema/post.schema';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  create(@Body() postData: Partial<PostModel>) {
    return this.postService.create(postData);
  }

  @Get('nest')
  findConsole() {
    return this.postService.consoleLog();
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<PostModel>) {
    return this.postService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
