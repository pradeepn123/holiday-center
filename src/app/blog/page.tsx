import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="bg-white pb-24">
        <Container className="pt-16">
          <h1 className="text-center text-[36px] font-extrabold text-neutral-950 sm:text-[40px]">
            Blogs
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
