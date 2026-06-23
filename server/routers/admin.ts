import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { authenticateAdmin, registerAdmin } from '../auth';
import { getArticles, getArticleBySlug, createArticle, updateArticle, deleteArticle } from '../db';
import { TRPCError } from '@trpc/server';

const adminRouter = router({
  /**
   * Admin authentication
   */
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input }) => {
      const user = await authenticateAdmin(input.email, input.password);
      
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }),

  /**
   * Article management
   */
  articles: router({
    list: publicProcedure.query(async () => {
      return getArticles();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const article = await getArticleBySlug(input.slug);
        if (!article) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Article not found',
          });
        }
        return article;
      }),

    create: publicProcedure
      .input(z.object({
        title: z.string().min(1),
        subtitle: z.string().optional(),
        category: z.string().min(1),
        content: z.string().min(1),
        coverUrl: z.string().optional(),
        author: z.string().min(1),
        slug: z.string().min(1),
        publishedAt: z.date(),
      }))
      .mutation(async ({ input }) => {
        const article = await createArticle({
          title: input.title,
          subtitle: input.subtitle,
          category: input.category,
          content: input.content,
          coverUrl: input.coverUrl,
          author: input.author,
          slug: input.slug,
          publishedAt: input.publishedAt,
        });

        if (!article) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create article',
          });
        }

        return article;
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        subtitle: z.string().optional(),
        category: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        coverUrl: z.string().optional(),
        author: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const article = await updateArticle(id, data);

        if (!article) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Article not found',
          });
        }

        return article;
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const success = await deleteArticle(input.id);

        if (!success) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Article not found',
          });
        }

        return { success: true };
      }),
  }),
});

export default adminRouter;
