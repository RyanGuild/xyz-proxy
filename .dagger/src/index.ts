import { BuildArg } from "./../sdk/src/api/client.gen";
/**
 * A generated module for Proxy functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */
import {
  Container,
  dag,
  Directory,
  func,
  object,
  Platform,
} from "@dagger.io/dagger";

@object()
export class Proxy {
  /**
   * Returns a container that echoes whatever string argument is provided
   */
  @func()
  async tag(src: Directory): Promise<string> {
    return dag.nsv(src).tag();
  }

  @func()
  async build(src: Directory): Promise<string> {
    const repo = await dag.git().load(src).commit(`chore: Build
      
      BUILD INFO

      nsv: pre~build
      `).repository();
    await dag.nsv(repo.state()).tag();

    return await repo.command(["tag"]).stdout();
  }
}
