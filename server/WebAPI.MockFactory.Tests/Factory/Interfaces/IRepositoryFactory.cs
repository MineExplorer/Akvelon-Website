using Infrastructure.Repositories;

namespace WebAPI.MockFactory.Tests.Factory.Interfaces
{
    public interface IRepositoryFactory
    {
        PositionRepository CreatePositionRepository();
    }
}