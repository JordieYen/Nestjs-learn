import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
export declare class BookmarkController {
    private bookmarkService;
    constructor(bookmarkService: BookmarkService);
    getBookmarks(userId: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Bookmark[]>;
    getBookmarkById(userId: number, bookmarkId: number): void;
    createBookmark(userId: number, dto: CreateBookmarkDto): Promise<import(".prisma/client").Bookmark>;
    editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto): void;
    deleteBookmarkById(userId: number, bookmarkId: number): void;
}
