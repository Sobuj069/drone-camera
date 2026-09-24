<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShowcaseTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_homepage_loads_successfully_with_inertia(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Home')
            ->has('banners')
            ->has('showcaseProducts')
            ->has('fieldCategories')
            ->has('flagship3dProduct')
        );
    }

    public function test_product_catalog_page_loads(): void
    {
        $response = $this->get('/products');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Products/Index')
            ->has('products')
            ->has('categories')
        );
    }

    public function test_product_show_page_loads_with_3d_specs(): void
    {
        $product = Product::first();
        $response = $this->get('/products/'.$product->slug);
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Products/Show')
            ->where('product.slug', $product->slug)
        );
    }

    public function test_compare_page_loads(): void
    {
        $response = $this->get('/compare');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Compare')
            ->has('allProducts')
        );
    }

    public function test_news_page_loads(): void
    {
        $response = $this->get('/news');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('News')
            ->has('posts')
        );
    }

    public function test_contact_inquiry_submission(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Alex Rivera',
            'email' => 'alex@example.com',
            'phone' => '+1 555-0199',
            'department' => 'Sales',
            'subject' => 'Fleet Inquiry for 5 Units',
            'message' => 'We are requesting a commercial quote for five Mavic 4 Pro units.',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('inquiries', [
            'email' => 'alex@example.com',
            'subject' => 'Fleet Inquiry for 5 Units',
        ]);
    }

    public function test_newsletter_subscription(): void
    {
        $response = $this->post('/newsletter', [
            'email' => 'pilot@drone-community.test',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('newsletter_subscribers', [
            'email' => 'pilot@drone-community.test',
        ]);
    }
}
