// BootstrapLoader.ts
export class BootstrapLoader {
    private static isLoaded = false;
  
    // Static method to load Bootstrap bundle
    static load(): void {
      if (!BootstrapLoader.isLoaded) {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
        BootstrapLoader.isLoaded = true;
      }
    }
  }
  